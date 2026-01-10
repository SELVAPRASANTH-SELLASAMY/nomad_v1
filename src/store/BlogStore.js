import { create } from "zustand";
import Axios from "../customhooks/httpMethod/utils/Axios";

const defaultFilters = {
    page: 1,
    category: "All",
    sort: {label:"name",value:"title"},
    sortOrder: 1,
    search: ""
}

export const useBlogManager = create((set) => ({
    blogs: [],
    hasMore: false,
    filters: defaultFilters,
    cachedFilters: "",
    addBlogs: (newBlogs) => set((state) => ({
        blogs: [...state.blogs,...newBlogs],
        cachedFilters: JSON.stringify(state.filters)
    })),
    deleteBlog: (blogId) => set((state) => ({
        blogs: state.blogs.filter(blog => blog._id !== blogId)
    })),
    setHasMore: (prop) => set({hasMore: prop}),
    incPage: () => set((state) => ({
        filters: {...state.filters,page: state.filters.page + 1}
    })),
    setCategory: (category) => set((state) => ({
        filters: {...state.filters,category: category, page: 1},
        blogs: []
    })),
    setSort: (sort) => set((state) => ({
        filters: {...state.filters,sort: sort, page: 1},
        blogs: []
    })),
    changeSortOrder: () => set((state) => ({
        filters: {...state.filters,sortOrder: 0 - state.filters.sortOrder, page: 1},
        blogs: []
    })),
    handleSearch: (input) => set((state) => ({
        filters: {...state.filters,search:input, page: 1},
        blogs: []
    })),
    clearBlogs: () => set(() => ({
        blogs: [],
        hasMore: false,
        filters: defaultFilters,
        cachedFilters: ""
    }))
}));

export const useBlogCategory = create((set,get) => ({
    categories: ["All"],
    fetchCategories: async() => {
        await Axios.get("/blog/getCategories",{withCredentials: true})
        .then((res) => {
            if(res?.data && get().categories.length < 2){
                set({categories: [...get().categories,...res.data.categories]});
            }
        })
        .catch((err) => {
            if(err.response){
                const { data } = err.response;
                const { message, error } = data;
                message ? console.error(message) : console.error(error);
            }
            else{
                console.error(err.message);
            }
        })
    },
    setCategories: (newCategories) => set((state) => ([...newCategories,...state.categories]))
}));