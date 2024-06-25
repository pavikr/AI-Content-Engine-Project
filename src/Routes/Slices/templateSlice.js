import { createSlice } from "@reduxjs/toolkit";

export const TemplateSlice = createSlice({
  name: "template",
  initialState: {
    fbCategory: [],
    selectedCategory: null,
    fbType: [],
    fbGeneratedDatas: [],
    categoryAndTypes: [],
    categoryWithTypesWithTemplates:[],
    selectTemplate:'',
    generateDatas:[],
    datas:[]
  },
  reducers: {
    setFbCategory: (state, action) => {
      state.fbCategory = action.payload;
    },
    setSelectedCategory: (state, action) => { 
      state.selectedCategory = action.payload;
    },
    setFbType: (state, action) => {
      state.fbType = action.payload;
      const categoryTypes = state.fbCategory.map((category) => {
        const typesForCategory = state.fbType
          .filter((type) => type.categoryId === category.categoryId)
          .map((doc) => doc.typeName);
        return { category, types: typesForCategory };
      });
      state.categoryAndTypes = categoryTypes;
      // console.log('catty',categoryTypes)
    },
    setFbGeneratedDatas: (state, action) => {
      state.fbGeneratedDatas = action.payload;
    },
    setCategoryAndTypes: (state, action) => {
      state.categoryAndTypes = action.payload;
      // console.log('fb',state.fbCategory)
      //   const cat = state.fbCategory.map((category) => {
      //     const typesForCategory = state.fbType
      //       .filter((type) => type.categoryId === category.categoryId)
      //       .map((type) => {
      //         const templatesForType = state.fbGeneratedDatas.filter(
      //           (data) => data.typeId === type.typeId
      //         );
      //         return {
      //           type: type.typeName,
      //           templates: templatesForType.map((template) => ({
      //             id: template.id,
      //             template: template.templates,
      //           })),
      //         };
      //       });
      //     return { category, types: typesForCategory };
      //   });
      //   // console.log(state.categoryWithTypesWithTemplates)
      //   console.log('cattyptemp',cat)
      //   state.categoryWithTypesWithTemplates = cat
      },
      setCategoryWithTypesWithTemplates:(state,action)=>{
        state.categoryWithTypesWithTemplates = action.payload
      },
      setSelectTemplate:(state,action)=>{
        state.selectTemplate = action.payload
      },
      setGenerateDatas : (state,action)=>{
        state.generateDatas = action.payload
      },
      setDatas:(state,action)=>{
        state.datas = action.payload
      }
  },
});
export const {
  setFbCategory,
  setSelectedCategory,
  setFbType,
  setCategoryAndTypes,
  setFbGeneratedDatas,
  setCategoryWithTypesWithTemplates,
  setSelectTemplate,
  setGenerateDatas,
  setDatas
} = TemplateSlice.actions;
export default TemplateSlice.reducer;
