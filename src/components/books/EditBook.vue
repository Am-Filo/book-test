<template>
    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >

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

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="stateDialog(false)">Close</v-btn>
            <v-btn :disabled="!valid" color="blue darken-1" text @click="validate">Save</v-btn>
        </v-card-actions>
        
    </v-form>
</template>

<script>
    export default {
        props: {
            book: {
                type: Object,
                required: true
            }
        },
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
        methods: {
            validate () {
                if (this.$refs.form.validate()) {
                    // let someObject = Object.assign({}, this.$store.getters.addForm)
                    // this.$store.dispatch('SaveBook', someObject);
                    let dialog = false;
                    this.$store.dispatch('EditBook', dialog);
                }
            },
            reset () {
                this.$refs.form.reset()
            },
            stateDialog(state){
                this.$store.dispatch('EditBook', state);
            }
        },
    }
</script>

<style>

</style>