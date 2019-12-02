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

    let toastr = require('toastr');
    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "300",
        "timeOut": "2000",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    export default {
        name: 'partymeister-slides-actions',
        props: ['activeElement', 'simple'],
        data: () => ({}),
        beforeDestroy() {
            this.$eventHub.$off();
        },
        mounted() {
            this.$eventHub.$on('partymeister-slides:receive-definitions', (data) => {
                let templates = localStorage.getItem('templates');
                templates = JSON.parse(templates);
                let definitions = JSON.parse(data.definitions);

                // Check if this template already exists
                let templateFound = false;
                for (const [index, template] of templates.entries()) {
                    if (template.id === definitions.id) {
                        templateFound = index;
                    }
                }

                if (templateFound !== false) {
                    templates[templateFound] = JSON.parse(data.definitions);
                    localStorage.setItem('templates', JSON.stringify(templates));
                    toastr.success('Template updated', 'Partymeister');
                } else {
                    templates.push(JSON.parse(data.definitions));
                    localStorage.setItem('templates', JSON.stringify(templates));
                    toastr.success('Template created', 'Partymeister');
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
