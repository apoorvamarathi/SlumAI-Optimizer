from datetime import timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models.database_models import User

from app.schemas.auth import (
    UserCreate,
    UserResponse,
    Token
)

from app.security import (
    hash_password,
    verify_password,
    create_access_token,
    get_current_user
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# =========================================================
# REGISTER
# =========================================================

@router.post(
    "/register",
    response_model=UserResponse
)
def register_user(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):

    existing_username = (
        db.query(User)
        .filter(
            User.username == user_data.username
        )
        .first()
    )

    if existing_username:

        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )


    existing_email = (
        db.query(User)
        .filter(
            User.email == user_data.email
        )
        .first()
    )

    if existing_email:

        raise HTTPException(
            status_code=400,
            detail="Email already exists"
        )


    hashed_password = hash_password(
        user_data.password
    )


    new_user = User(
        username=user_data.username,
        email=user_data.email,
        hashed_password=hashed_password,
        role="viewer"
    )


    db.add(new_user)
    db.commit()
    db.refresh(new_user)


    return new_user


# =========================================================
# LOGIN
# =========================================================

@router.post(
    "/login",
    response_model=Token
)
def login_user(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    user = (
        db.query(User)
        .filter(
            User.username == form_data.username
        )
        .first()
    )


    if user is None:

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )


    if not verify_password(
        form_data.password,
        user.hashed_password
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={
                "WWW-Authenticate": "Bearer"
            }
        )


    access_token_expires = timedelta(
        minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
    )


    # access_token = create_access_token(
    #     data={
    #         "sub": user.username
    #     },
    #     expires_delta=access_token_expires
    # )

    access_token = create_access_token(
        data={
            "sub": user.username,
            "role": user.role
        },
        expires_delta=access_token_expires
    )


    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


# =========================================================
# CURRENT USER
# =========================================================

@router.get(
    "/me",
    response_model=UserResponse
)
def get_me(
    current_user: User = Depends(
        get_current_user
    )
):

    return current_user