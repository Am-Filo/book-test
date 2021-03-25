<template>
  <v-form
        ref="form"
        v-model="valid"
        lazy-validation
  >
    <v-card-actions>
        <v-btn
            text 
            small 
            color="success"
            :disabled="!valid"
            @click="validate"
        >
            Add book
        </v-btn>

        <v-btn
            text 
            small 
            color="error"
            @click="reset"
        >
            Reset book
        </v-btn>

        <v-spacer></v-spacer>

    </v-card-actions>

    <v-text-field
        v-model="book.title"
        :rules="titleRules"
        label="Title"
        required
    ></v-text-field>

    <v-text-field
        v-model="book.year"
        :counter="4"
        :rules="yearRules"
        type="number"
        label="Year"
        required
    ></v-text-field>

    <v-text-field
        v-model="book.owner"
        :rules="ownerRules"
        label="Owner"
        required
    ></v-text-field>

    <v-textarea
        v-model="book.text"
        :rules="textRules"
        label="Text"
        required
    ></v-textarea>

  </v-form>
</template>

<script>
    import { mapState } from "vuex";
    export default {
        data: () => ({
            valid: false,
            titleRules: [
                v => !!v || 'Title is required',
                v => (v && v.length >= 3) || 'Title must be more than 3 characters',
            ],
            yearRules: [
                v => !!v || 'Year is required',
                v => (v && v.length >= 4 && v.length <= 4) || 'Year must be 4 characters',
                v => (v >= 1200 && v <= new Date().getFullYear()) || 'Year must be from 1200 to '+new Date().getFullYear()+' year'
            ],
            ownerRules: [
                v => !!v || 'Owner is required',
            ],
            textRules: [
                v => !!v || 'Text is required',
                v => (v && v.length >= 10) || 'Text must be more than 10 characters',
            ],
        }),
        computed: {
            ...mapState({
                book: state => state.addForm,
            })
        },
        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                    let someObject = Object.assign({}, this.$store.getters.addForm)
                    this.$store.dispatch('SaveBook', someObject);
                    
                    this.$refs.form.resetValidation()
                }
            },
            reset () {
                this.$refs.form.reset()
            }
        },
    }
</script>

<style>

</style>