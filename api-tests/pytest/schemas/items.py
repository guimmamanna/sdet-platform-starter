from __future__ import annotations

from pydantic import BaseModel, Field, model_validator


class UserSchema(BaseModel):
    username: str
    displayName: str = Field(min_length=3)


class AuthResponseSchema(BaseModel):
    token: str = Field(min_length=10)
    user: UserSchema


class ItemSchema(BaseModel):
    id: str
    title: str = Field(min_length=3)
    description: str = Field(min_length=5)
    owner: str
    status: str
    tags: list[str]
    createdAt: str
    updatedAt: str


class ItemsResponseSchema(BaseModel):
    count: int
    items: list[ItemSchema]

    @model_validator(mode="after")
    def validate_count_matches_payload(self) -> "ItemsResponseSchema":
        if self.count != len(self.items):
            raise ValueError("count must equal len(items)")
        return self
