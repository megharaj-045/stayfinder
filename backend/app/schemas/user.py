from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    is_host: bool = False


class UserResponse(UserCreate):
    id: int

    class Config:
        from_attributes = True