export default {
    methods: {
        renderCompetitionSupport(replacements) {
            Object.entries(this.elements).forEach(([key, element]) => {
                this.replaceContent(element, 'headline', replacements.headline);
                this.replaceContent(element, 'body', replacements.entry.competition.data.name);
            });
        },
        renderCompetitionParticipants(replacements) {
            Object.entries(this.elements).forEach(([key, element]) => {
                this.replaceContent(element, 'participants', replacements);
                element.properties.content = element.properties.content.replace(/<<.+>>/, '');
                this.$forceNextTick(() => {
                    this.updateElementProperties(element);
                });
            });
        },
        renderCompetitionEntry(replacements) {
            Object.entries(this.elements).forEach(([key, element]) => {
                Object.entries(replacements).forEach(([property, value]) => {
                    this.replaceContent(element, property, value);
                });
                element.properties.content = element.properties.content.replace(/<<.+>>/, '');
                this.$forceNextTick(() => {
                    this.updateElementProperties(element);
                });
            });
        },
    }
};
