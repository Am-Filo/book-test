import Vue from 'vue';
import Vuex from 'vuex';
// import Axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        books: [],
        dialogState: false,
        addformvalid: true,
        addForm: {
            title: null,
            year: null,
            owner: null,
            text: null
        }
    },
    
    getters: {
        books: state => {
            return state.books;
        },
        getbook: (state) => (index) => {
            return state.books[index];
        },
        dialogState: state => {
            return state.dialogState;
        },
        addFormValid: state => {
            return state.addformvalid;
        },
        addForm: state => {
            return state.addForm;
        }
    },
    
    mutations: {
        LoadBooks: (state, payload) => {
            state.books = payload;
        },
        AddBook: (state, book) => {
            state.books.push(book);
            Object.keys(state.addForm).forEach(function (key){
                state.addForm[key] = null
            });
        },
        DeleteBook: (state, index) => {
            state.books.splice(index,1);
        },
        SaveBook: (state) => {
            localStorage.setItem('books', JSON.stringify(state.books));

            /*
                Using cookies
                this.$cookie.set('books', state.books, 7);
            */
                
        },
        StateDialog: (state, dialog) => {
            state.dialogState = dialog;
        }
    },
    
    actions: {
        GetBooks: async (context) => {

            /* 
                for laravel load data or some another api
            
                let {data} = await Axios.get('http://yourwebsite.com/api/books');
                context.commit('LoadBooks', data);

                cookies

                if(this.$cookie.get('books')) {
                    try {
                        context.commit('LoadBooks', this.$cookie.get('books'));
                    } catch(e) {
                        this.$cookie.delete('books')
                    }
                }

            */

            // localstorage

            if(localStorage.getItem('books')) {
                try {
                    context.commit('LoadBooks', JSON.parse(localStorage.getItem('books')));
                } catch(e) {
                    localStorage.removeItem('books');
                }
            }

        },
        SaveBook: async (context, book) => {
        //   let {data} = await Axios.post('http://your_site.com/api/books');
            context.commit('AddBook', book);
            context.commit('SaveBook');
        },
        EditBook: async (context, dialog) => {
        //   let {data} = await Axios.post('http://your_site.com/api/books');
            context.commit('StateDialog', dialog);
            context.commit('SaveBook');
        },
        DeleteBook: async (context, index) => {
        //   let {data} = await Axios.post('http://your_site.com/api/books');
            context.commit('DeleteBook', index);
            context.commit('SaveBook');
        }
    }
});