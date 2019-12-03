<template>
    <div class="row content">
        <div class="col-md-10">
            <div class="row">
                <div v-for="(template, index) in templates" :key="template.id" class="col-md-4">
                    <div class="template-wrapper" style="z-index: 12000; position: relative;"
                         @mouseover="onMouseOver($event, index)"
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
                            <button @click="editTemplate($event, index)" type="button" class="btn btn-sm btn-primary">
                                Edit
                            </button>
                            <button @click="deleteTemplate($event, index)" type="button" class="btn btn-sm btn-danger">
                                Delete
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
                    <button @click="createTemplate" class="btn btn-block btn-success btn-sm">Create new template
                    </button>
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
    };

    import * as comingUp from '../assets/default-templates/coming_up.json';
    import * as now from '../assets/default-templates/now.json';
    import * as end from '../assets/default-templates/end.json';
    import * as announce from '../assets/default-templates/announce.json';
    import * as announceRight from '../assets/default-templates/announce_with_image_right.json';
    import * as comments from '../assets/default-templates/comments.json';
    import * as participants from '../assets/default-templates/participants.json';
    import * as prizegiving from '../assets/default-templates/prizegiving.json';
    import * as timetable from '../assets/default-templates/timetable.json';
    import * as entry1 from '../assets/default-templates/competition_entry-1.json';
    import * as entry2n from '../assets/default-templates/competition_entry-2-n.json';

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
            } else {
                // Load default templates
                this.templates.push(comingUp.default);
                this.templates.push(now.default);
                this.templates.push(end.default);
                this.templates.push(announce.default);
                this.templates.push(announceRight.default);
                this.templates.push(comments.default);
                this.templates.push(participants.default);
                this.templates.push(prizegiving.default);
                this.templates.push(timetable.default);
                this.templates.push(entry1.default);
                this.templates.push(entry2n.default);
                localStorage.setItem('templates', JSON.stringify(this.templates));
            }
            this.$eventHub.$on('partymeister-slides:file-loaded', (data) => {
                let template = JSON.parse(data);
                if (template.id === undefined) {
                    template = {
                        id: Math.floor((Math.random() * 100000000) + 1),
                        elements: JSON.parse(data),
                    };
                }

                this.templates.push(template);
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
                toastr.success('Template deleted', 'Partymeister');
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
        position: fixed;
        right: 0;
    }
</style>
