<template>

    <v-container
        :fluid=true
        class="grey lighten-5"
    >
        <v-row
            no-gutters
        >
            <v-col
                cols="12"
                xs="12"
                sm="6"
                md="8"
            >
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                    <FormAdd></FormAdd>
                </v-card>
            </v-col>

            <v-col
                cols="12"
                xs="12"
                sm="6"
                md="4"
            >
                <v-card
                    class="pa-2"
                    outlined
                    tile
                >
                    <v-list two-line subheader>
                    <v-subheader inset>Books</v-subheader>

                    <v-list-item
                        v-for="(item, index) in bookList"
                        :key="index"
                        :to="'view/'+index"
                    >

                        <v-list-item-avatar>
                            <v-icon class="pink--text">mdi-book</v-icon>
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                            <v-list-item-subtitle class="text--primary" v-text="item.owner"></v-list-item-subtitle>
                            <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-action>
                            <v-btn class="grey lighten-3 mr-4" icon @click.prevent="actionBook(item, false, 'View', true,index)">
                                <v-icon color="grey lighten-1">mdi-eye</v-icon>
                            </v-btn>
                        </v-list-item-action>

                        <v-list-item-action>
                            <v-btn class="blue lighten-5" icon @click.prevent="actionBook(item, true, 'Edit', false,index)">
                                <v-icon color="grey lighten-1">mdi-pencil</v-icon>
                            </v-btn>
                        </v-list-item-action>

                        <v-list-item-action>
                            <v-btn class="red lighten-5" icon @click.prevent="deleteBook(index)">
                                <v-icon color="red">mdi-delete</v-icon>
                            </v-btn>
                        </v-list-item-action>


                    </v-list-item>

                    </v-list>

                </v-card>

            </v-col>
        </v-row>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-container class="container">
                <v-card-title class="headline">{{ title }} Book</v-card-title>
                <EditModalForm v-if="editState" :book="setBook"></EditModalForm>
                <ViewModalForm v-else :book="setBook" :btnState="btnState"></ViewModalForm>
            </v-container>
        </v-dialog>
        
    </v-container>

</template>

<script>
    import FormAdd from '../forms/FormAdd';
    import EditModalForm from '../books/EditBook';
    import ViewModalForm from '../books/ViewBook';
    import { mapState } from "vuex";

    export default {

        data () {
            return {
                setBook: null,
                editState: true,
                title: 'Edit',
                btnState: true
            }
        },
        components: {
            FormAdd,
            EditModalForm,
            ViewModalForm
        },
        computed: {
            bookList() {
                return this.$store.getters.books;
            },
            ...mapState({
                dialog: state => state.dialogState
            })
        },
        methods: {
            actionBook(setbook,editable,title,btn,index){

                this.setBook = setbook;
                this.title = title;
                this.btnState = btn;

                if(editable === true)
                    this.editState = true;
                else {
                    this.editState = false;
                    window.history.pushState(index,"View Book", "/view/"+index);
                }

                this.$store.commit('StateDialog', true);

            },
            deleteBook(index){
                this.$store.dispatch('DeleteBook', index);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        background-color: white;
    }
</style>