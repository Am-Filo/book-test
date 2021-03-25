<template>
    <v-row>
        <v-card
            :outlined="true"
            v-if="btnState"
            :width="100+'%'"
        >
            <v-card-title class="headline">{{ book.title }} <span class="caption book-owner">{{ book.owner }} ({{ book.year }})</span></v-card-title>
            <v-card-text class="overline" v-html="book.text"></v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog(false)">Close</v-btn>
            </v-card-actions>

        </v-card>

        <v-card
            :outlined="true"
            v-else
            :width="100+'%'"
        >
            <v-card-title class="headline">{{ bookOne.title }} <span class="caption book-owner">{{ bookOne.owner }} ({{ bookOne.year }})</span></v-card-title>
            <v-card-text class="overline" v-html="bookOne.text"></v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text :to="'/'">Back</v-btn>
            </v-card-actions>

        </v-card>
    </v-row>
</template>

<script>

export default {
    props: {
        book: {
            type: Object,
        },
        btnState: {
            type: Boolean,
            default: false
        },
        id: {
            type: String
        }
    },
    computed: {
            bookOne() {
                return this.$store.getters.getbook(this.id);
            },
        },
    methods: {
        closeDialog(state) {
            window.history.pushState(state,"Mainpage", "/");
            this.$store.commit('StateDialog',state)
        }
    }
}
</script>

<style lang="scss" scoped>
    .book-owner{
        margin-left: 10px;
    }
</style>