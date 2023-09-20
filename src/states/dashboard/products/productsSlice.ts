import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { EStateGeneric, ICategory, IProduct } from "@/shared/types";
import { deleteProductByApi, disableProductByApi, getDashboardProductsByApi, getDashboardProductsDisabledByApi, restoreProductByApi } from "./productsApi";

export const getAllProducts = createAsyncThunk(
  "dashboardProducts/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardProductsByApi();
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const disableProducts = createAsyncThunk(
  "dashboardProducts/disableProducts",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await disableProductByApi(code);
      // console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const restoreProducts = createAsyncThunk(
  "dashboardProducts/restoreProducts",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await restoreProductByApi(code);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const hiddenProducts = createAsyncThunk(
  "dashboardProducts/hiddenProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getDashboardProductsDisabledByApi();
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


export const deleteProducts = createAsyncThunk(
  "dashboardProducts/deleteProducts",
  async (code:string, { rejectWithValue }) => {
    try {
      const response = await deleteProductByApi(code);
      console.log(response);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);







interface IDashboardProductsState {
  products: IProduct[];
  productshidden: IProduct[];
  allProductsStatus: EStateGeneric;
  producthiddenStatus: EStateGeneric;

}

const initialState: IDashboardProductsState = {
  products: [],
  productshidden: [],
  producthiddenStatus: EStateGeneric.IDLE,
  allProductsStatus: EStateGeneric.IDLE,

};

export const dashboardProductsSlice = createSlice({
  name: "dashboardProducts",
  initialState,
  reducers: {
    cleanuphiddenProducts: (state) => {
      return {
        ...state,
        productshidden: [],
        producthiddenStatus: EStateGeneric.IDLE
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.allProductsStatus = EStateGeneric.SUCCEEDED;
    });
    builder.addCase(getAllProducts.pending, (state, action) => {
      state.allProductsStatus = EStateGeneric.PENDING;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.allProductsStatus = EStateGeneric.FAILED;
    });




    builder.addCase(disableProducts.fulfilled, (state, action) => {
      console.log('Producto deshabilitado con éxito:', action.payload);
      state.products = state.products.filter(product => product.code !== action.payload.code);
    })

    builder.addCase(disableProducts.pending, (state, action) => {
      console.log('accion ejecutandose')
    });

    builder.addCase(disableProducts.rejected, (state, action) => {
      // Puedes manejar el error si es necesario
      console.error('Error al deshabilitar el producto:', action.error.message);
    });




    builder.addCase(restoreProducts.fulfilled, (state, action) => {
      console.log('Producto restaurado con éxito:', action.payload);
      state.productshidden = state.productshidden.filter(product => product.code !== action.payload.code);

    })

    builder.addCase(restoreProducts.pending, (state, action) => {
      console.log('accion ejecutandose')
    });

    builder.addCase(restoreProducts.rejected, (state, action) => {
      // Puedes manejar el error si es necesario
      console.error('Error al restaurar el producto:', action.error.message);
    });




    builder.addCase(hiddenProducts.fulfilled, (state, action) => {
      state.productshidden = action.payload;
      state.producthiddenStatus = EStateGeneric.SUCCEEDED
    })

    builder.addCase(hiddenProducts.pending, (state, action) => {
      state.producthiddenStatus = EStateGeneric.PENDING
    });

    builder.addCase(hiddenProducts.rejected, (state, action) => {
      state.producthiddenStatus = EStateGeneric.FAILED
    });


    
    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      console.log('Producto eliminado con éxito:', action.payload);
      state.productshidden = state.productshidden.filter(product => product.code !== action.payload.code);

    })

    builder.addCase(deleteProducts.pending, (state, action) => {
      console.log('accion ejecutandose')
    });

    builder.addCase(deleteProducts.rejected, (state, action) => {
      // Puedes manejar el error si es necesario
      console.error('Error al eliminar el producto:', action.error.message);
    });




  },
});

export const { cleanuphiddenProducts } = dashboardProductsSlice.actions

export const selectAllDashboardProducts = (state: RootState) =>
  state.dashboard.products.products;

export const selecthiddenproducts = (state: RootState) =>
  state.dashboard.products.productshidden;


export const selectAllDashboardProductsStatus = (state: RootState) =>
  state.dashboard.products.allProductsStatus;

export const selectAllhiddenProductsStatus = (state: RootState) =>
  state.dashboard.products.producthiddenStatus;


export default dashboardProductsSlice.reducer;
