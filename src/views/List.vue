<template>
    <div class="row content">
        <div class="col-md-10">
            <div class="row">
                <div v-for="(template, index) in templates" :key="index" class="col-md-4">
                    <div class="template-wrapper" style="z-index: 12000; position: relative;" @mouseover="onMouseOver($event, index)"
                         @mouseout="onMouseOut($event, index)">
                        <partymeister-slides-elements class="slidemeister-template" :element-data="template"
                                                      :readonly="true" :id="'template-editor-'+index"
                                                      :name="'template-editor-'+index">

                        </partymeister-slides-elements>
                        <div :id="'button-group-'+index" class="btn-group invisible" role="group"
                             aria-label="Basic example">
                            <button @click="exportTemplate($event, index)" type="button" class="btn btn-sm btn-primary">
                                Export
                            </button>
                            <button @click="editTemplate($event, index)" type="button" class="btn btn-sm btn-primary">Edit
                            </button>
                            <button @click="deleteTemplate($event, index)" type="button" class="btn btn-sm btn-danger">Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-2">
            <div class="sidebar">
                <h6>Data</h6>
                <div>
                    <button @click="createTemplate" class="btn btn-block btn-success btn-sm">Create new template</button>
                    <file-reader></file-reader>
                    <a id="download-definitions" style="display: none;" href="">Hidden download link</a>
                </div>
                <hr>
            </div>
        </div>
    </div>
</template>

<script>
    import FileReader from "@/components/FileReader";
    import PartymeisterSlidesElements from "@/components/Elements";
    import router from '../router'

    export default {
        name: 'list',
        components: {FileReader, PartymeisterSlidesElements},
        data: () => ({
            templates: [],
        }),
        mounted() {
            let templates = localStorage.getItem('templates');
            templates = JSON.parse(templates);
            if (templates !== null && templates.length > 0) {
                this.templates = templates;
            }
            this.$eventHub.$on('partymeister-slides:file-loaded', (data) => {
                this.templates.push(JSON.parse(data));
                localStorage.setItem('templates', JSON.stringify(this.templates));
            });
        },
        methods: {
            exportTemplate($event, index) {
                this.$eventHub.$emit('partymeister-slides:download-definitions', 'template-editor-' + index);
                $event.preventDefault();
            },
            createTemplate($event) {
                router.push({name: 'create'})
            },
            editTemplate($event, index) {
                router.push({name: 'edit', params: {template: index}})

                $event.preventDefault();
            },
            deleteTemplate($event, index) {
                let answer = confirm("Do you really want to delete this template?");
                if (answer) {
                    this.templates.splice(index, 1);
                    localStorage.setItem('templates', JSON.stringify(this.templates));
                }
                $event.preventDefault();
            },
            onMouseOver($event, index) {
                document.querySelector('#button-group-' + index).classList.remove('invisible');
            },
            onMouseOut($event, index) {
                document.querySelector('#button-group-' + index).classList.add('invisible');
            },
        }
    }
</script>
<style lang="scss" scoped>
    .template-wrapper {
        height: calc(540px * 0.3);
    }
    .content .row {
        margin: 20px;
    }

    .btn-group {
        .btn {
            border-radius: 0 !important;
            position: relative;
        }
        z-index: 10002;
        position: absolute;
        bottom: 0;
        width: calc(960px * 0.3);
    }

    .slidemeister-template {
        height: 540px;
        width: 960px;
        border: 1px solid black;
        zoom: 0.3;
        margin-top: 40px;
    }

    .col-md-2 {
        height: calc(100vh - 50px);
        background-color: #efefef;
    }
</style>
