// import { createSlice,type PayloadAction } from "@reduxjs/toolkit";

// interface OtpState {
//   email: string | null;
// };

// const initialState: OtpState = {
//   email: null
// }

// const VarifyOtpSlice = createSlice(
//   {
//     name: 'varifyOtp',
//     initialState,
//     reducers:{
//       setEmail:(state,action:PayloadAction<string>)=>{
//         state.email = action.payload;
//       },
//       clearEmail:(state)=>{
//         state.email = null
//       }
//     }
// });

// export const {setEmail,clearEmail} = VarifyOtpSlice.actions;
// export default VarifyOtpSlice.reducer;