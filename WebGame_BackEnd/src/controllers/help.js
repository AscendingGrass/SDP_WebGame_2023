

const {VertexAI} = require('@google-cloud/vertexai');


const postHelp = async (req, res) => {
    // Initialize Vertex with your Cloud project and location
    const vertex_ai = new VertexAI({project: 'diesel-amulet-404008', location: 'us-central1'});
    const model = 'gemini-pro';

    // Instantiate the models
    const generativeModel = vertex_ai.preview.getGenerativeModel({
        model: model,
        generation_config: {
            "max_output_tokens": 2048,
            "temperature": 0.9,
            "top_p": 1
        },
    });

    const chat = generativeModel.startChat({});
    const question = req.body.prompt;

    const userMessage0 = [{text: 
        "== global actions  ==\n"+
        "\nMETHODS\n"+
        "\n=====================\n"+
        "alert();\nalert(message);\n"+
        "\nprint a message in red to the logs, print \"ALERT!\" instead if message is not specified.\n"+
        "\nreturns the printed message\n\nparameters:\nmessage\n- a string that you want to print out\n"+
        "\nexamples:\nalert();\n- prints \"ALERT!\" in red to the logs and returns \"ALERT!\"\nalert(message);\n"+
        "- prints the contents of message in red to the logs and returns the message\n\n=====================\n"+
        "random(start, end);\n\nreturns a random number from a range between start and end, start is implicit and end is explicit\n"+
        "\nparameters:\nstart\n- the starting range, is implicit\nend\n- the end of the range, is explicit\n\nexamples:\nalert(2, 5);\n"+
        "- returns a number randomly selected between 2, 3, and 4. the number 5 cannot be selected because the end range is explicit.\n"+
        "\n=====================\nNO OPERATIONS\n\n== player actions  ==\n\nMETHODS\n\n=====================\nself.moveUp();\n"+
        "self.moveUp(distance);\n\nmove upwards 1 tile if distance is not provided or move upwards according to the distance if provided\n"+
        "\nreturns nothing\n\ndistance\n- the number of distance to travel\n\nexamples:\nself.moveUp();\n- move up 1 tile\nself.moveUp(5);\n"+
        "- move up 5 tiles\n\n=====================\nself.moveDown();\nself.moveDown(distance);\n"+
        "\nmove downwards 1 tile if distance is not provided or move downwards according to the distance if provided\n"+
        "\nreturns nothing\n\ndistance\n- the number of distance to travel\n\nexamples:\nself.moveDown();\n- move down 1 tile\n"+
        "self.moveDown(5);\n- move down 5 tiles\n\n=====================\nself.moveLeft();\nself.moveLeft(distance);\n\nmove left 1 tile if distance is not provided or move left according to the distance if provided\n\nreturns nothing\n\ndistance\n- the number of distance to travel\n\nexamples:\nself.moveLeft();\n- move left 1 tile\nself.moveLeft(5);\n- move left 5 tiles\n\n=====================\nself.moveRight();\nself.moveRight(distance);\n\nmove right 1 tile if distance is not provided or move right according to the distance if provided\n\nreturns nothing\n\nparameters:\n\ndistance\n- the number of distance to travel\n\nexamples:\nself.moveRight();\n- move right 1 tile\nself.moveRight(5);\n- move right 5 tiles\n\n=====================\nself.interact();\n"+
        "self.interact(direction);\n\ninteract with the object in front of the direction the player is facing if a direction is not specified, interact with the object in the direction specified otherwise. examples of interactable objects: doors.\n\nreturns nothing\n\nparameters:\n\ndirection\n- a string specifying the direction to interact (\"up\", \"down\", \"left\", \"right\")\n\nexamples:\nself.interact();\n- interact with the object above if the player is facing upwards\nself.interact(\"right\");\n- turn right and interact with the object to the right of the player\n\n=====================\nself.talk();\n\ntalk with the NPC in front of the direction the player is facing\n\nreturns nothing\n\nparameters:\n\n\nexamples:\nself.talk();\n"+
        "- interact with the NPC above if the player is facing upwards\n\n=====================\nself.up;\n\nmake the player look upwards\n\nreturns the name of the object above the player\n\nparameters:\n\nexamples:\nself.up;\n- make the player look upwards if not already\n\n=====================\nself.down;\n\nmake the player look downwards\n\nreturns the name of the object below the player\n\nparameters:\n\nexamples:\nself.down;\n- make the player look downwards if not already\n\n=====================\nself.left;\n\nmake the player look left\n\nreturns the name of the object to the left of the player\n\nparameters:\n\nexamples:\nself.down;\n- make the player look left if not already\n\n=====================\nself.right;\n"+
        "\nmake the player look right\n\nreturns the name of the object to the right of the player\n\nparameters:\n\nexamples:\nself.down;\n- make the player look right if not already\n\n=====================\nself.ground;\n\nreturns the name of the tile the player is stepping on\n\nparameters:\n\nexamples:\nself.ground;\n- returns \"floor\" if the player is standing on a floor\n\n=====================\nself.x;\n\nreturns the x coordinate the player is currently on\n\nparameters:\n\nexamples:\nself.x;\n- returns 3 if the player is standing on coordinate 3,5\n\n=====================\nself.y;\n\nreturns the y coordinate the player is currently on\n\nparameters:\n\nexamples:\nself.y;\n- returns 5 if the player is standing on coordinate 3,5\n\n=====================\n\nNO OPERATIONS\n"+
        "\n== number actions  ==\n\nMETHODS\n\n=====================\n<number>.toString();\n\nreturns a string version of the number\n\nparameters:\n\nexamples:\n5.toString();\n- returns \"5\", the string version of the number 5\nnum = 5;\nnum.toString();\n- returns \"5\", the string version of the number 5 which is stored in the variable num\n\n=====================\n\nOPERATIONS\n<number> + <number>\n<number> + <string>\n<number> - <number>\n<number> * <number>\n<number> / <number>\n<number> % <number>\n<number> == <number>\n<number> != <number>\n<number> < <number>\n<number> > <number>\n<number> <= <number>\n<number> >= <number>\n-<number>\n\n== string actions  ==\n\nMETHODS\n\n=====================\n<string>.toNumber();\n\nreturns a number version of the string\n\nparameters:\n\nexamples:\n\"123\".toString();\n- returns 123, the number version of the string \"123\"\nstr = \"123\";\nstr.toNumber();\n- returns 123, the number version of the string \"123\" which is stored in the variable str\n\n=====================\n\nOPERATIONS\n<string> + <string>\n<string> + <number>\n<string> == <string>\n<string> != <string>\n\n== boolean actions ==\n\nNO METHODS\n\n=====================\n\nOPERATIONS\n<boolean> == <boolean>\n<boolean> != <boolean>\n<boolean> && <boolean>\n<boolean> || <boolean>\n\nA player is playing a game that requires code to control the character, based on the documentation above answer the players questions!\n\nplayer "+
        "question : " + question}];
    const streamResult0 = await chat.sendMessageStream(userMessage0);
    res.status(200).json({response:(await streamResult0.response).candidates[0].content});
}


module.exports = {
    postHelp
}