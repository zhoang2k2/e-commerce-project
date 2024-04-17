/* eslint-disable react-refresh/only-export-components */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "../Store";
import type { AccountState, AccountType } from "../../types/AccountType";

const initialState: AccountState = {
  accounts: [],
  status: "IDLE",
};

export const fetchAccounts = createAsyncThunk("accounts/fetch", async () => {
  try {
    const response = await axios.get("http://localhost:3000/accounts");
    return response.data as AccountType[];
  } catch (error) {
    console.error("fail to get account");
    throw error;
  }
});

export const addAccount = createAsyncThunk(
  "accounts/add",
  async (newAccount: AccountType) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/accounts",
        newAccount
      );
      return response.data;
    } catch (error) {
      console.error("Error when adding account");
      throw error;
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "accounts/delete",
  async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/accounts/${id}`);
      return id;
    } catch (error) {
      console.error("Error when adding account");
      throw error;
    }
  }
);

export const editAccount = createAsyncThunk(
  "accounts/edit",
  async (account: AccountType) => {
    try {
      if (!account.id) {
        throw new Error("Invalid account ID");
      }
      const response = await axios.put(
        `http://localhost:3000/accounts/${account.id}`,
        account
      );
      return response.data;
    } catch (error) {
      console.error("Error when editing account:", error);
      throw error;
    }
  }
);

const AccountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAccounts.fulfilled, (state, action) => {
        if (action.payload) {
          state.accounts = action.payload;
          state.status = "SUCCESS";
        }
      })
      .addCase(fetchAccounts.pending, (state) => {
        state.status = "LOADING";
      })
      .addCase(fetchAccounts.rejected, (state) => {
        state.status = "FAIL";
      });
  },
});

export default AccountSlice;
export const selectAccountState = (state: RootState) => state.accounts;
