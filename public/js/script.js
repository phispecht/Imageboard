(function () {
    Vue.component("modal-component", {
        props: ["id"],
        template: "#template",
        mounted: function () {
            var id = this.id;
            var self = this;

            axios
                .get("/oneImage/" + id)
                .then(function (response) {
                    self.oneImage = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });

            axios
                .get("/comments/" + id)
                .then(function (response) {
                    self.comments = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        data: function () {
            return {
                url: self.url,
                commentUsername: "",
                commentInput: "",
                comments: [],
                oneImage: {},
            };
        },
        methods: {
            handleComment: function (e) {
                e.preventDefault();

                var id = this.id;
                var self = this;
                var commentUsername = self.commentUsername;
                var commentInput = self.commentInput;
                var objectSendData = { id, commentUsername, commentInput };

                axios
                    .post("/comments", { objectSendData })
                    .then(function (comments) {
                        self.comments.unshift(comments.data.rows[0]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    });

    new Vue({
        el: "#main",
        data: {
            images: [],
            title: "",
            username: "",
            description: "",
            id: null,
            file: null,
            show: false,
            url: "",
        },
        mounted: function () {
            var self = this;

            axios
                .get("/images")
                .then(function (response) {
                    self.images = response.data;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },

        methods: {
            checkShow(id) {
                this.id = id;
                this.show = this.id;
            },
            handleClose() {
                this.show = null;
                this.id = null;
            },
            handleClick: function (e) {
                e.preventDefault();

                var formData = new FormData();
                formData.append("title", this.title);
                formData.append("description", this.description);
                formData.append("username", this.username);
                formData.append("file", this.file);

                var self = this;

                axios
                    .post("/upload", formData)
                    .then(function (resp) {
                        self.images.unshift(resp.data[0]);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },

            handleChange: function (e) {
                this.file = e.target.files[0];
            },

            //////// more Images ///////
            loadMore: function () {
                var amountImages = this.images.length;
                var firstId = this.images[0].id;

                var self = this;

                axios
                    .get("/moreImages/" + firstId + "/" + amountImages)
                    .then(function (moreImages) {
                        self.images = self.images.concat(moreImages.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        },
    });
})();
