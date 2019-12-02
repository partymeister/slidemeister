<template>
    <div id="vuedropzone" :style="{ zIndex: zIndex }">
    </div>
</template>

<script>
    export default {
        name: 'partymeister-slides-dropzone',
        data: function () {
            return {
                droppedFiles: [],
                zIndex: -1
            };
        },
        components: {},
        methods: {
            onDragLeave($event) {
                this.zIndex = -1;
                $event.preventDefault();
            },
            onDragEnter($event) {
                this.zIndex = 10000;
                $event.preventDefault();
            },
            onDragOver($event) {
                $event.preventDefault();
            },
            onDrop($event) {
                this.zIndex = -1;
                let file = null;
                if ($event.dataTransfer.files.length > 0) {
                    file = $event.dataTransfer.files[0];
                }
                if (file) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onloadend = () => {
                        this.$eventHub.$emit('partymeister-slides:image-dropped-from-dataurl', {
                            file: file,
                            dataUrl: reader.result
                        })
                    }
                }
                $event.preventDefault();
            },
            onAdd: function (event) {
                this.$eventHub.$emit('partymeister-slides:image-dropped', this.droppedFiles[event.newIndex].file.file_original_relative);
            },
            isImage: function (file) {
                if (file.file.mime_type == 'image/png' || file.file.mime_type == 'image/jpg' || file.file.mime_type == 'image/jpeg' || file.file.mime_type == 'video/mp4') {
                    return true;
                }
                return false;
            },
        },
        mounted: function () {
            let dropArea = document.getElementById('vuedropzone');

            document.body.addEventListener('dragenter', this.onDragEnter, false);
            document.body.addEventListener('dragleave', this.onDragLeave, false);
            document.body.addEventListener('drop', this.onDrop, false)

            // dropArea.addEventListener('dragenter', this.onDragEnter, false)
            // dropArea.addEventListener('dragleave', this.onDragLeave, false)
            dropArea.addEventListener('dragover', this.onDragOver, false)
            // dropArea.addEventListener('drop', this.onDrop, false)
        }
    }
</script>
<style lang="scss">
    #vuedropzone {
        width: 958px !important;
        box-sizing: border-box;
        position: absolute;
        background: transparent;
        border: none !important;
    }
</style>
