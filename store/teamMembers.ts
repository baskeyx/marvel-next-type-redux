import { createSlice } from "@reduxjs/toolkit";

interface CharacterObject {
  id: number;
  name: string;
  thumbnail: string;
}

interface CharactersArray extends Array<CharacterObject>{}

const slice = createSlice({
  name: 'teamMembers',
  initialState: [],
  reducers: {
    addTeamMember: (teamMembers: CharactersArray, action) => {
      teamMembers.push({
        id: action.payload.id,
        name: action.payload.name,
        thumbnail: action.payload.thumbnail,
      })
    },
    removeTeamMember: (teamMembers, action) => {
      return teamMembers.filter((m: CharacterObject) => m.id !== action.payload.id)
    },
    clearTeamMembers: () => {
      return [];
    }
  }
})

export const {addTeamMember, removeTeamMember, clearTeamMembers} = slice.actions;
export default slice.reducer;