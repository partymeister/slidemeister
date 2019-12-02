<template>
    <div v-if="!simple">
        <h6>Data</h6>
        <div>
            <button @click="saveTemplate" class="btn btn-block btn-success btn-sm">Save</button>
        </div>
        <hr>
        <h6>Actions</h6>
        <div>
            <button @click="addElement" class="btn btn-block btn-success btn-sm">Add</button>
            <button :disabled="activeElement === undefined" @click="cloneElement"
                    class="btn btn-block btn-warning btn-sm">Clone
            </button>
            <button :disabled="activeElement === undefined" @click="deleteElement"
                    class="btn btn-block btn-danger btn-sm">Delete
            </button>
        </div>
    </div>
</template>
<script>

    export default {
        name: 'partymeister-slides-actions',
        props: ['activeElement', 'simple'],
        data: () => ({
        }),
        beforeDestroy() {
            this.$eventHub.$off();
        },
        mounted() {
            this.$eventHub.$on('partymeister-slides:receive-definitions', (data) => {
                let templates = localStorage.getItem('templates');

                if (this.$route.params.template !== undefined && this.$route.params.template !== null) {
                    templates = JSON.parse(templates);
                    templates[this.$route.params.template] = JSON.parse(data.definitions);
                    localStorage.setItem('templates', JSON.stringify(templates));
                    console.log("Template updated");
                } else {
                    templates = JSON.parse(templates);
                    templates.push(JSON.parse(data.definitions));
                    localStorage.setItem('templates', JSON.stringify(templates));
                    console.log("Template created");
                }
            });
        },
        methods: {
            saveTemplate() {
                this.$eventHub.$emit('partymeister-slides:request-definitions', 'template-editor');
            },
            addElement() {
                const uniqid = 'element_' + Math.floor((Math.random() * 100000000) + 1);
                this.$eventHub.$emit('partymeister-slides:add-element', uniqid);
            },
            cloneElement() {
                const uniqid = 'element_' + Math.floor((Math.random() * 100000000) + 1);
                this.$eventHub.$emit('partymeister-slides:clone-element', {
                    uniqid: uniqid,
                    name: this.activeElement.name
                });
            },
            deleteElement() {
                this.$eventHub.$emit('partymeister-slides:delete-element', this.activeElement.name);

            }
        }
    }
</script>
<style>
</style>
