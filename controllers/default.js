exports.install = function(framework) {
    framework.route('/', view_homepage);
    framework.websocket('/', socket_homepage, ['json']);
};

function socket_homepage(controller) {

    controller.on('open', function(client) {
        console.log('online:', controller.online);
    });

    controller.on('message', function(client, message) {

        if (message.username)
            client.id = message.username;

        controller.send({ message: client.id + ': ' + message.message });

    });

    controller.on('close', function(client) {
        controller.send({ message: client.id + ': offline' });
        console.log('online:', controller.online);
    });
};

function view_homepage() {
    var self = this;
    self.view('homepage');
}