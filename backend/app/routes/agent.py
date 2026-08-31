from fastapi import APIRouter, Depends
from pydantic import BaseModel

from agents import Runner

from app.agent.water_agent import water_agent
from app.agent.fallback_service import local_answer

from app.security import get_current_user


router = APIRouter(
    prefix="/agent",
    tags=["AI Agent"],
)


class AgentRequest(BaseModel):
    message: str


@router.post("/ask")
async def ask_agent(
    request: AgentRequest,
    current_user=Depends(get_current_user),
):

    question = request.message.strip()

    if not question:
        return {
            "question": question,
            "answer": "Please enter a question.",
            "mode": "local",
        }

    try:

        result = await Runner.run(
            water_agent,
            question,
        )

        return {
            "question": question,
            "answer": result.final_output,
            "mode": "ai",
        }

    except Exception as e:

        print(
            f"AI Agent unavailable: {e}"
        )

        answer = local_answer(question)

        return {
            "question": question,
            "answer": answer,
            "mode": "local_fallback",
        }