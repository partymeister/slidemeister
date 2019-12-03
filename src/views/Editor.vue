<template>
      <div class="row content">
        <partymeister-slides-dropzone></partymeister-slides-dropzone>
        <div class="col-md-10">
          <div id="slidemeister-wrapper">
            <div id="slidemeister-canvas">
              <div id="slidemeister-canvas-border">
              </div>
              <div id="slidemeister">
                <partymeister-slides-elements :load-template="$route.params.template" id="template-editor"
                                              :name="'template-editor'"></partymeister-slides-elements>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="sidebar">
            <partymeister-slides-controls :simple="false"></partymeister-slides-controls>
          </div>
        </div>
      </div>
</template>

<script>
  import PartymeisterSlidesElements from "@/components/Elements";
  import PartymeisterSlidesControls from "@/components/Controls";
  import PartymeisterSlidesDropzone from "@/components/Dropzone";

  export default {
    components: {PartymeisterSlidesDropzone, PartymeisterSlidesElements, PartymeisterSlidesControls}
  }
</script>
<style lang="scss">
  .col-md-10 {
    padding: 0 !important;
  }


</style>
<style lang="scss">
  .list-group-item {
    padding: 0.25rem 1.25rem;
  }
</style>
<style scoped lang="scss">
  #slidemeister-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
  }

  #slidemeister-canvas {
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
    border: 1px solid #c2cfd6;
    border-top: none;

    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    background-color: #abcdef;
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
    background-image: -webkit-linear-gradient(white 2px, transparent 2px),
    -webkit-linear-gradient(0, white 2px, transparent 2px),
    -webkit-linear-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px),
    -webkit-linear-gradient(0, rgba(255, 255, 255, .1) 1px, transparent 1px);
    background-image: -moz-linear-gradient(white 2px, transparent 2px),
    -moz-linear-gradient(0, white 2px, transparent 2px),
    -moz-linear-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px),
    -moz-linear-gradient(0, rgba(255, 255, 255, .1) 1px, transparent 1px);
    background-image: linear-gradient(white 2px, transparent 2px),
    linear-gradient(90deg, white 2px, transparent 2px),
    linear-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, .1) 1px, transparent 1px);
    -pie-background: linear-gradient(white 2px, transparent 2px) -2px -2px / 100px,
    linear-gradient(90deg, white 2px, transparent 2px) -2px -2px / 100px,
    linear-gradient(rgba(255, 255, 255, .1) 1px, transparent 1px) -1px -1px / 20px,
    linear-gradient(90deg, rgba(255, 255, 255, .1) 1px, transparent 1px) -1px -1px / 20px,
    #269;
  }

  #slidemeister-canvas-border {
    border: 1px solid black;
    position: absolute;
    width: 960px;
    height: 540px;
  }

  #slidemeister, #vuedropzone, .slidemeister-instance {
    clip-path: inset(0);
    background-color: #fff;
    border: 1px solid black;
    position: relative;
    width: 960px;
    height: 540px;

    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .slidemeister-element {
    position: absolute;
    width: 200px;
    height: 100px;
    left: 50px;
    top: 50px;
    background-color: transparent;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    border: 2px solid transparent;
    padding: 0;
    margin: 0;
  }

  #slidemeister-properties {
  }


  .slidemeister-property-list {
    justify-content: space-between;
  }

  .editable {
    background: transparent;
  }

  #slidemeister-layers-container .list-group-item {
    padding: 0.25rem 0.5rem;
  }

  .slidemeister-navbar .nav-item {
    width: 50%;
    text-align: center;
  }

  .slidemeister-element {
    display: flex;
  }

  [contenteditable]:focus {
    outline: 0 solid transparent;
  }
</style>
