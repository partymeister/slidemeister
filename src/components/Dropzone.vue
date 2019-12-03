<template>
    <div id="dropzone" :style="{'zIndex': zIndex}">
        Drop it like it's hawt!
    </div>
</template>

<script>
    export default {
        name: 'partymeister-slides-dropzone',
        data: function () {
            return {
                droppedFiles: [],
                zIndex: -1,
                dragInProgress: false,
                interval: false,
            };
        },
        components: {},
        methods: {
            onDragLeave($event) {
                let elements = document.querySelectorAll('.medium-editor-element');
                for (let element of elements) {
                    element.style.pointerEvents = 'auto';
                }
                this.zIndex = -1;
                if ($event !== undefined) {
                    $event.preventDefault();
                    $event.stopPropagation();
                }
            },
            onDragEnter($event) {
                $event.preventDefault();
                $event.stopPropagation();
            },
            onDragOver($event) {
                this.dragInProgress = Date.now();
                this.zIndex = 13000;
                let elements = document.querySelectorAll('.medium-editor-element');
                for (let element of elements) {
                    element.style.pointerEvents = 'none';
                }
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
                        let image = new Image();
                        image.onload = () => {
                            this.$eventHub.$emit('partymeister-slides:image-dropped-from-dataurl', {
                                file: file,
                                dataUrl: reader.result,
                                width: image.naturalWidth,
                                height: image.naturalHeight,
                                ratio: image.naturalWidth / image.naturalHeight,
                            })
                        };
                        image.src = reader.result;
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
            this.interval = setInterval(() => {
                // Dragging has stopped
                if (this.dragInProgress !== false && this.dragInProgress < Date.now() - 1000) {
                    this.dragInProgress = false;
                    this.onDragLeave();
                }
            }, 500);
            document.body.addEventListener('dragover', this.onDragOver, false);
            document.body.addEventListener('drop', this.onDrop, false)
        },
        beforeDestroy() {
            this.$eventHub.$off();
            document.body.removeEventListener('dragover', this.onDragOver, false);
            document.body.removeEventListener('drop', this.onDrop, false);

            clearInterval(this.interval);
        },
    }
</script>
<style lang="scss">
    #dropzone {
        display: flex;
        position: absolute;
        width: 100vw;
        height: 100vh;
        background: white;
        opacity: 0.9;
        z-index: 13000;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 50px;
        color: #333;
    }
</style>
