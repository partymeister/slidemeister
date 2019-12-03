<template>
    <div id="app">
        <div class="container-fluid">
            <div class="row header-row">
                <div class="col-md-12 header">
                    <div class="d-flex justify-content-center">
                        <img class="logo" src="./assets/pm-logo-small.png">
                        <h1>
                            Partymeister Slide-Template Editor
                        </h1>
                    </div>
                    <button v-if="canGoBack" @click="navigateToList" class="btn btn-sm btn-danger d-flex justify-content-end">Back</button>
                </div>
            </div>
            <router-view/>
        </div>
    </div>
</template>
<script>
    export default {
        data: () => ({
            canGoBack: false,
        }),
        watch:{
            $route (to, from){
                if (this.$router.currentRoute.name === 'list') {
                    this.canGoBack = false;
                } else {
                    this.canGoBack = true;
                }
            }
        },
        mounted() {
            if (this.$router.currentRoute.name === 'list') {
                this.canGoBack = false;
            } else {
                this.canGoBack = true;
            }
        },
        methods: {
            navigateToList() {
                this.$router.push({name: 'list'})
            }
        }
    }
</script>

<style lang="scss">
    // Your variable overrides

    $blue:       #20a8d8 !default;
    $indigo:     #6610f2 !default;
    $purple:     #6f42c1 !default;
    $pink:       #e83e8c !default;
    $red:        #f86c6b !default;
    $orange:     #f8cb00 !default;
    $yellow:     #ffc107 !default;
    $green:      #4dbd74 !default;
    $teal:       #20c997 !default;
    $cyan:       #17a2b8 !default;

    @import '~bootstrap';
    @import "~medium-editor/dist/css/medium-editor";
    @import "~medium-editor/dist/css/themes/beagle";
    @import "~toastr/toastr";

    .header-row {
        height: 50px;
        -webkit-app-region: drag
    }

    .header-row button {
        position: absolute;
        top: 0;
        right: 15px;
        margin-top: 10px;
        -webkit-app-region: no-drag;
    }

    .logo {
        margin: 12px 10px;
        max-height: 25px;
        float: left;
    }

    .header {
        background-color: white;
        position: fixed;
        z-index: 12200;
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #c8ced3;
    }

    .header h1 {
        font-size: 20px;
        margin-top: 12px;
        float: left;
    }

    .content {
    }

    body {
        margin: 0 !important;
    }

    .sidebar {
        margin-top: 25px;
        height: calc(100vh - 100px);
        position: relative;
        overflow-x: hidden;
        overflow-y: auto;
    }

    .form-control-sm {
        display: inline-block;
        max-width: 100px;
        float: right;
    }
</style>
