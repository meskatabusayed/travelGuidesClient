import { IFollower } from "@/types/follwer";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: {
  following: IFollower[];
  followers: IFollower[];
} = {
  following: [],
  followers: [],
};

const followersSlice = createSlice({
  name: "followers",
  initialState,
  reducers: {
    setFollowers(state, action: PayloadAction<IFollower[] | []>) {
      state.followers = action.payload;
    },

    setFollowing(state, action: PayloadAction<IFollower[] | []>) {
      state.following = action.payload;
    },
  },
});

export const { setFollowers,setFollowing } = followersSlice.actions;
export default followersSlice.reducer;