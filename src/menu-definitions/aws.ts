import { Menu } from ".";

const menuDefs: Menu[] = [{
    id: "aws",
    text: "AWS",
    actions: [
        {
            id: 'aws_dynamodb',
            text: 'Amazon DynamoDB',
            paths: [{
                d: "M 62.890625 98.828125 L 64.105469 98.828125 L 83.917969 89.019531 L 84.25 88.558594 L 84.25 10.265625 L 83.917969 9.800781 L 64.105469 0 L 62.878906 0 L 62.890625 98.828125",
                fill: "rgb(32.156863%,58.039216%,81.176471%)",
            }, {
                d: "M 37.109375 98.828125 L 35.875 98.828125 L 16.082031 89.019531 L 15.679688 88.335938 L 15.476562 10.664062 L 16.082031 9.800781 L 35.875 0 L 37.121094 0 L 37.109375 98.828125",
                fill: "rgb(12.156863%,35.686275%,59.607843%)",
            }, {
                d: "M 35.910156 0 L 64.085938 0 L 64.085938 98.828125 L 35.910156 98.828125 Z M 35.910156 0",
                fill: "rgb(17.647059%,44.705882%,72.156863%)",
            }, {
                d: "M 94.289062 47.195312 L 93.621094 47.046875 L 84.0625 46.164062 L 83.917969 46.234375 L 64.089844 45.449219 L 35.910156 45.449219 L 16.082031 46.234375 L 16.082031 31.261719 L 16.058594 31.273438 L 16.082031 31.230469 L 35.910156 26.679688 L 64.089844 26.679688 L 83.917969 31.230469 L 91.210938 35.066406 L 91.210938 32.601562 L 94.289062 32.265625 L 93.972656 31.652344 L 84.214844 24.746094 L 83.917969 24.839844 L 64.089844 18.757812 L 35.910156 18.757812 L 16.082031 24.839844 L 16.082031 9.800781 L 5.710938 21.828125 L 5.710938 32.332031 L 5.789062 32.277344 L 8.789062 32.601562 L 8.789062 35.117188 L 5.710938 36.75 L 5.710938 47.203125 L 5.789062 47.195312 L 8.789062 47.238281 L 8.789062 51.625 L 6.203125 51.664062 L 5.710938 51.617188 L 5.710938 62.074219 L 8.789062 63.714844 L 8.789062 66.261719 L 5.839844 66.582031 L 5.710938 66.488281 L 5.710938 76.988281 L 16.082031 89.019531 L 16.082031 73.980469 L 35.910156 80.066406 L 64.089844 80.066406 L 83.976562 73.964844 L 84.242188 74.078125 L 93.867188 67.273438 L 94.289062 66.597656 L 91.210938 66.261719 L 91.210938 63.765625 L 90.804688 63.605469 L 84.214844 67.121094 L 83.976562 67.613281 L 64.089844 72.136719 L 64.089844 72.144531 L 35.910156 72.144531 L 35.910156 72.136719 L 16.082031 67.597656 L 16.082031 52.570312 L 35.910156 53.351562 L 35.910156 53.371094 L 64.089844 53.371094 L 83.917969 52.570312 L 84.371094 52.773438 L 93.636719 51.984375 L 94.289062 51.667969 L 91.210938 51.625 L 91.210938 47.238281 L 94.289062 47.195312",
                fill: "rgb(10.196078%,27.843137%,43.529412%)",
            }, {
                d: "M 83.917969 73.980469 L 83.917969 89.019531 L 94.289062 76.988281 L 94.289062 66.554688 L 83.980469 73.964844 L 83.917969 73.980469",
                fill: "rgb(17.647059%,44.705882%,72.156863%)",
            }, {
                d: "M 83.917969 67.628906 L 83.980469 67.613281 L 94.289062 62.125 L 94.289062 51.625 L 83.917969 52.570312 L 83.917969 67.628906",
                fill: "rgb(17.647059%,44.705882%,72.156863%)",
            }, {
                d: "M 83.980469 31.246094 L 83.917969 31.230469 L 83.917969 46.234375 L 94.289062 47.195312 L 94.289062 36.699219 L 83.980469 31.246094",
                fill: "rgb(17.647059%,44.705882%,72.156863%)",
            }, {
                d: "M 83.980469 24.898438 L 94.289062 32.265625 L 94.289062 21.832031 L 83.917969 9.800781 L 83.917969 24.839844 L 83.980469 24.863281 L 83.980469 24.898438",
                fill: "rgb(17.647059%,44.705882%,72.156863%)",
            }]
        }, {
            id: 'aws_ec2',
            text: 'Amazon EC2',
            paths: [{
                d: "M 22.5 78.871094 L 12.851562 81.070312 L 12.851562 18.570312 L 22.5 20.777344 L 22.5 78.871094",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 34.542969 82.558594 L 22.5 85.980469 L 22.5 13.746094 L 34.542969 17.164062 L 34.542969 82.558594",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 49.988281 86.347656 L 34.542969 92 L 34.542969 7.722656 L 49.988281 13.375 L 49.988281 86.347656",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 91.289062 79.058594 L 49.988281 99.707031 L 49.988281 0 L 91.289062 20.652344 L 91.289062 79.058594",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 41.757812 4.117188 L 49.988281 0 L 49.988281 99.707031 L 41.757812 95.59375 L 41.757812 4.117188",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 28.167969 10.910156 L 34.542969 7.722656 L 34.542969 91.984375 L 28.167969 88.796875 L 28.167969 10.910156",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 17.425781 16.28125 L 22.5 13.746094 L 22.5 85.964844 L 17.425781 83.425781 L 17.425781 16.28125",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 12.851562 18.570312 L 8.710938 20.640625 L 8.710938 79.070312 L 12.851562 81.140625 L 12.851562 18.570312",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }]
        }, {
            id: 'aws_iam',
            text: 'AWS IAM',
            paths: [{
                d: "M 28.164062 33.828125 L 23.878906 35.226562 L 28.316406 35.738281 L 28.164062 33.828125",
                fill: "rgb(23.529412%,28.627451%,16.078431%)",
            }, {
                d: "M 27.949219 42.207031 L 50 43.613281 L 72.050781 42.207031 L 50 37.90625 L 27.949219 42.207031",
                fill: "rgb(23.529412%,28.627451%,16.078431%)",
            }, {
                d: "M 71.734375 35.738281 L 76.121094 35.226562 L 71.734375 34.054688 L 71.734375 35.738281",
                fill: "rgb(23.529412%,28.627451%,16.078431%)",
            }, {
                d: "M 55.996094 72.027344 L 67.550781 74.761719 L 55.964844 78.253906 L 55.996094 72.027344",
                fill: "rgb(71.764706%,79.215686%,61.568627%)",
            }, {
                d: "M 27.949219 18.820312 L 27.949219 11.023438 L 50 0 L 50.097656 0.0820312 L 50.046875 9.980469 L 50 10 L 49.917969 10.230469 L 37.855469 15.097656 L 37.746094 32.246094 L 44.164062 31.167969 L 50 30 L 50 100.007812 L 43.394531 96.703125 L 43.394531 87.363281 L 37.609375 85.050781 L 37.609375 41.238281 L 27.949219 42.207031 L 27.949219 34.410156 L 23.878906 35.226562 L 23.878906 20.449219 L 27.949219 18.820312",
                fill: "rgb(29.411765%,38.039216%,17.254902%)",
            }, {
                d: "M 44.164062 31.167969 L 37.609375 32.480469 L 37.609375 14.957031 L 44.164062 17 L 44.164062 31.167969",
                fill: "rgb(45.882353%,61.176471%,24.313725%)",
            }, {
                d: "M 61.414062 5.707031 L 72.046875 11.023438 L 72.046875 18.820312 L 76.121094 20.449219 L 76.121094 35.222656 L 72.046875 34.410156 L 72.046875 42.207031 L 66.855469 41.6875 L 62.390625 41.238281 L 62.390625 50 L 72.050781 50 L 72.050781 58.019531 L 67.5625 58.421875 L 67.5625 66.503906 L 56.601562 68.683594 L 56.601562 78.023438 L 67.535156 74.78125 L 67.5625 83.019531 L 56.601562 87.363281 L 56.601562 96.703125 L 50 100.007812 L 50 30 L 55.832031 31.164062 L 62.074219 31.988281 L 62.074219 15.09375 L 50.167969 10.503906 L 50 10 L 50 0 L 61.414062 5.707031",
                fill: "rgb(45.882353%,61.176471%,24.313725%)",
            }, {
                d: "M 56.601562 12.640625 L 50 10.003906 L 37.609375 14.957031 L 44.164062 17 L 56.601562 12.640625",
                fill: "rgb(23.529412%,28.627451%,16.078431%)",
            }, {
                d: "M 37.609375 14.957031 L 50 10.003906 L 52.605469 11.042969 L 56.601562 12.640625 L 62.390625 14.957031 L 62.082031 15.273438 L 56.1875 17.105469 L 55.832031 17 L 50 14.957031 L 44.164062 17 L 37.609375 14.957031",
                fill: "rgb(23.529412%,28.627451%,16.078431%)",
            }, {
                d: "M 55.832031 17 L 62.390625 14.957031 L 62.390625 32.480469 L 55.832031 31.164062 L 55.832031 17",
                fill: "rgb(29.411765%,38.039216%,17.254902%)",
            }]
        }, {
            id: 'aws_kinesis',
            text: 'Amazon Kinesis',
            paths: [{
                d: "M 8.574219 55.691406 L 49.921875 74.722656 L 91.265625 55.691406 L 49.921875 53.976562 Z M 8.574219 55.691406",
                fill: "rgb(98.823529%,74.901961%,57.254902%)",
            }, {
                d: "M 50.046875 0 L 8.59375 20.671875 L 8.59375 49.84375 L 58.300781 49.84375 L 58.300781 4.125 Z M 50.046875 0",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 8.59375 70.40625 L 50.070312 99.753906 L 91.421875 70.40625 L 49.980469 64.378906 Z M 8.59375 70.40625",
                fill: "rgb(98.823529%,74.901961%,57.254902%)",
            }, {
                d: "M 50.046875 49.84375 L 71.917969 49.84375 L 71.917969 18.71875 L 65.53125 16.164062 L 50.046875 20.679688 Z M 50.046875 49.84375",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 65.53125 49.84375 L 82.433594 49.84375 L 82.433594 29.65625 L 77.597656 28.203125 L 65.53125 30.253906 Z M 65.53125 49.84375",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 77.597656 26.621094 L 77.597656 49.84375 L 91.265625 49.84375 L 91.425781 26.519531 L 87.273438 24.859375 Z M 77.597656 26.621094",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 50.046875 0 L 50.046875 49.84375 L 58.300781 49.84375 L 58.300781 4.125 Z M 50.046875 0",
                fill: "rgb(96.470588%,52.156863%,20.392157%)",
            }, {
                d: "M 71.917969 18.71875 L 65.53125 16.164062 L 65.53125 49.84375 L 71.917969 49.84375 Z M 71.917969 18.71875",
                fill: "rgb(96.470588%,52.156863%,20.392157%)",
            }, {
                d: "M 82.433594 29.65625 L 77.597656 28.203125 L 77.597656 49.84375 L 82.433594 49.84375 Z M 82.433594 29.65625",
                fill: "rgb(96.470588%,52.156863%,20.392157%)",
            }, {
                d: "M 87.273438 49.84375 L 91.425781 49.84375 L 91.425781 26.519531 L 87.273438 24.859375 Z M 87.273438 49.84375",
                fill: "rgb(96.470588%,52.156863%,20.392157%)",
            }, {
                d: "M 49.921875 59.828125 L 49.921875 74.722656 L 91.265625 64.417969 L 91.265625 55.691406 Z M 49.921875 59.828125",
                fill: "rgb(96.470588%,52.156863%,20.392157%)",
            }, {
                d: "M 49.921875 85.042969 L 49.921875 99.753906 L 91.421875 79 L 91.421875 70.40625 Z M 49.921875 85.042969",
                fill: "rgb(96.470588%,52.156863%,20.392157%)",
            }, {
                d: "M 8.59375 79.089844 L 49.921875 99.753906 L 49.921875 84.933594 L 8.59375 70.40625 Z M 8.59375 79.089844",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 8.574219 64.417969 L 49.921875 74.722656 L 49.921875 59.824219 L 8.574219 55.691406 Z M 8.574219 64.417969",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }]
        }, {
            id: 'aws_lambda',
            text: 'AWS Lambda',
            paths: [{
                d: "M 8.710938 79.117188 L 13.976562 81.75 L 14.839844 80.214844 L 14.839844 19.140625 L 13.976562 18.011719 L 8.710938 20.644531 L 8.710938 79.117188",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 24.089844 20.507812 L 13.976562 18.011719 L 13.976562 81.75 L 24.089844 79.394531 L 24.089844 20.507812",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 55.125 25.355469 L 62.332031 21.613281 L 86.300781 30.898438 L 79.929688 31.730469 L 55.125 25.355469",
                fill: "rgb(41.960784%,22.745098%,9.803922%)",
            }, {
                d: "M 55.402344 74.40625 L 62.46875 78.148438 L 86.441406 68.863281 L 80.066406 68.03125 L 55.402344 74.40625",
                fill: "rgb(98.431373%,74.901961%,57.647059%)",
            }, {
                d: "M 57.207031 64.152344 L 69.8125 65.816406 L 70.539062 64.515625 L 70.539062 35.484375 L 69.8125 33.945312 L 57.207031 35.609375 L 57.207031 64.152344",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 20.210938 14.824219 L 27.96875 10.945312 L 28.816406 12.582031 L 28.816406 87.097656 L 27.96875 88.816406 L 20.210938 84.9375 L 20.210938 14.824219",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 43.765625 83.550781 L 27.96875 88.675781 L 27.96875 10.945312 L 43.765625 16.074219 L 43.765625 83.550781",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 37.667969 93.527344 L 50 99.761719 L 51.289062 98.28125 L 51.289062 1.828125 L 50 0 L 37.667969 6.234375 L 37.667969 93.527344",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 79.652344 31.730469 L 86.023438 30.898438 L 86.574219 31.695312 L 86.574219 68.066406 L 86.023438 69 L 79.652344 68.171875 L 79.652344 31.730469",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 69.8125 33.945312 L 69.8125 65.953125 L 82.976562 49.882812 L 69.8125 33.945312",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 86.023438 18.011719 L 50 0 L 50 99.761719 L 91.289062 79.117188 L 91.289062 20.644531 Z M 86.023438 69.050781 L 62.332031 76.125 L 62.332031 23.636719 L 86.023438 30.710938 Z M 86.023438 69.050781",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }]
        }, {
            id: 'aws_rds',
            text: 'Amazon RDS',
            paths: [{
                d: "M 5.710938 76.988281 L 16.082031 89.019531 L 17.011719 87.921875 L 17.011719 10.960938 L 16.082031 9.800781 L 5.710938 21.828125 L 5.710938 76.988281",
                fill: "rgb(10.196078%,27.843137%,43.529412%)",
            }, {
                d: "M 16.082031 89.019531 L 35.898438 98.828125 L 36.722656 97.515625 L 36.734375 1.027344 L 35.914062 0 L 16.082031 9.777344 L 16.082031 89.019531",
                fill: "rgb(12.156863%,35.686275%,59.607843%)",
            }, {
                d: "M 94.289062 21.828125 L 83.917969 9.800781 L 82.757812 10.164062 L 82.988281 88.039062 L 83.917969 89.019531 L 94.289062 76.988281 L 94.289062 21.828125",
                fill: "rgb(17.647059%,44.705882%,72.156863%)",
            }, {
                d: "M 64.101562 98.828125 L 83.917969 89.019531 L 83.917969 9.777344 L 64.085938 0 L 63.148438 1.257812 L 63.164062 97.402344 L 64.101562 98.828125",
                fill: "rgb(32.156863%,58.039216%,81.176471%)",
            }, {
                d: "M 35.914062 0 L 64.085938 0 L 64.085938 98.832031 L 35.914062 98.832031 Z M 35.914062 0",
                fill: "rgb(17.647059%,44.705882%,72.156863%)",
            }]
        }, {
            id: 'aws_s3',
            text: 'Amazon S3',
            paths: [{
                d: "M 15.363281 17.316406 L 8.710938 20.644531 L 8.710938 79.039062 L 15.363281 82.347656 L 15.402344 82.296875 L 15.402344 17.363281 L 15.363281 17.316406",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 50.96875 73.871094 L 15.363281 82.347656 L 15.363281 17.316406 L 50.96875 25.609375 L 50.96875 73.871094",
                fill: "#E05243",
            }, {
                d: "M 34.894531 60.601562 L 50 62.523438 L 50.09375 62.304688 L 50.179688 37.542969 L 50 37.347656 L 34.894531 39.242188 L 34.894531 60.601562",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 50 73.964844 L 84.632812 82.363281 L 84.6875 82.277344 L 84.6875 17.375 L 84.632812 17.316406 L 50 25.703125 L 50 73.964844",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 65.105469 60.601562 L 50 62.523438 L 50 37.347656 L 65.105469 39.242188 L 65.105469 60.601562",
                fill: "rgb(87.843137%,32.156863%,26.27451%)",
            }, {
                d: "M 65.105469 28.914062 L 50 31.667969 L 34.894531 28.914062 L 49.980469 24.960938 L 65.105469 28.914062",
                fill: "rgb(36.862745%,12.156863%,9.411765%)",
            }, {
                d: "M 65.105469 70.902344 L 50 68.132812 L 34.894531 70.902344 L 49.980469 75.113281 L 65.105469 70.902344",
                fill: "rgb(94.901961%,69.019608%,66.27451%)",
            }, {
                d: "M 34.894531 28.914062 L 50 25.175781 L 50.121094 25.136719 L 50.121094 0.101562 L 50 0 L 34.894531 7.550781 L 34.894531 28.914062",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 65.105469 28.914062 L 50 25.175781 L 50 0 L 65.105469 7.550781 L 65.105469 28.914062",
                fill: "rgb(87.843137%,32.156863%,26.27451%)",
            }, {
                d: "M 50 99.816406 L 34.894531 92.265625 L 34.894531 70.90625 L 50 74.640625 L 50.222656 74.894531 L 50.160156 99.378906 L 50 99.816406",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 50 99.816406 L 65.105469 92.265625 L 65.105469 70.90625 L 50 74.640625 L 50 99.816406",
                fill: "rgb(87.843137%,32.156863%,26.27451%)",
            }, {
                d: "M 84.632812 17.316406 L 91.289062 20.644531 L 91.289062 79.039062 L 84.632812 82.363281 L 84.632812 17.316406",
                fill: "rgb(87.843137%,32.156863%,26.27451%)",
            }]
        }, {
            id: 'aws_glacier',
            text: 'Amazon S3 Glacier',
            paths: [{
                d: "M 50 74.203125 L 84.746094 82.632812 L 84.777344 82.574219 L 84.78125 17.429688 L 84.75 17.375 L 50 25.785156 L 50 74.203125",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 84.746094 17.375 L 91.425781 20.710938 L 91.425781 79.296875 L 84.746094 82.632812 L 84.746094 17.375",
                fill: "rgb(87.843137%,32.156863%,26.27451%)",
            }, {
                d: "M 50 74.203125 L 15.253906 82.613281 L 15.246094 82.59375 L 15.242188 17.390625 L 15.253906 17.375 L 50 25.785156 L 50 74.203125",
                fill: "rgb(87.843137%,32.156863%,26.27451%)",
            }, {
                d: "M 15.253906 17.375 L 8.574219 20.710938 L 8.574219 79.296875 L 15.253906 82.613281 L 15.253906 17.375",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 50 100.003906 L 50.144531 99.824219 L 50.027344 0.0234375 L 50 0 L 34.84375 7.578125 L 34.84375 92.429688 L 50 100.003906",
                fill: "rgb(54.901961%,19.215686%,13.72549%)",
            }, {
                d: "M 50 100.003906 L 50 0 L 65.15625 7.578125 L 65.15625 92.429688 L 50 100.003906",
                fill: "rgb(87.843137%,32.156863%,26.27451%)",
            }]
        }, {
            id: 'aws_sns',
            text: 'Amazon SNS',
            paths: [{
                d: "M 38.667969 90.285156 L 28.382812 87.402344 L 18.652344 76.308594 L 30.820312 75.972656 L 38.667969 90.285156",
                fill: "rgb(60%,35.686275%,50.196078%)",
            }, {
                d: "M 14.882812 82.96875 L 9.09375 81.347656 L 3.625 75.109375 L 10.273438 74.015625 L 14.882812 82.96875",
                fill: "rgb(60%,35.686275%,50.196078%)",
            }, {
                d: "M 0.195312 74.324219 L 6.109375 75.527344 L 6.96875 74.019531 L 6.96875 22.765625 L 6.109375 21.765625 L 0.195312 25.136719 L 0.195312 74.324219",
                fill: "rgb(48.235294%,24.705882%,39.607843%)",
            }, {
                d: "M 28.960938 27.125 L 6.113281 21.765625 L 6.113281 75.527344 L 9.535156 75.210938 L 14.882812 82.96875 L 19.007812 74.328125 L 28.960938 73.40625 L 28.960938 27.125",
                fill: "rgb(75.686275%,48.235294%,61.568627%)",
            }, {
                d: "M 13.40625 77.09375 L 23.550781 79.136719 L 24.214844 77.5625 L 24.214844 14.566406 L 23.550781 13.140625 L 13.40625 18.28125 L 13.40625 77.09375",
                fill: "rgb(48.235294%,24.705882%,39.607843%)",
            }, {
                d: "M 81.414062 31.71875 L 23.550781 13.140625 L 23.550781 79.140625 L 30.25 78.277344 L 38.667969 90.285156 L 45.332031 76.335938 L 81.414062 71.691406 L 81.414062 31.71875",
                fill: "rgb(75.686275%,48.235294%,61.568627%)",
            }, {
                d: "M 70.945312 99.800781 L 56.328125 95.707031 L 42.511719 79.949219 L 60.425781 79.765625 L 70.945312 99.800781",
                fill: "rgb(60%,35.686275%,50.196078%)",
            }, {
                d: "M 35.054688 81.304688 L 49.96875 84.191406 L 51.128906 83.191406 L 51.128906 1.601562 L 49.96875 0 L 35.054688 7.453125 L 35.054688 81.304688",
                fill: "rgb(48.235294%,24.705882%,39.607843%)",
            }, {
                d: "M 99.804688 24.914062 L 49.972656 0 L 49.972656 84.191406 L 58.761719 82.425781 L 70.945312 99.800781 L 81.414062 77.890625 L 81.40625 77.890625 L 99.804688 74.207031 L 99.804688 24.914062",
                fill: "rgb(75.686275%,48.235294%,61.568627%)",
            }]
        }, {
            id: 'aws_sqs',
            text: 'Amazon SQS',
            paths: [{
                d: "M 91.421875 32.429688 L 90.089844 32.410156 L 50.027344 20.546875 L 50.003906 20 L 50.003906 0 L 91.425781 20.714844 L 91.421875 32.429688",
                fill: "#D9A741",
            }, {
                d: "M 50 21.199219 L 50.003906 0 L 8.582031 20.707031 L 8.574219 79.285156 L 8.597656 79.296875 L 49.996094 100 L 50.132812 99.808594 L 50.078125 80.109375 L 50 80 L 47.410156 78.15625 L 15.371094 68.609375 L 15.535156 31.554688 L 50 21.199219",
                fill: "rgb(52.941176%,41.176471%,16.078431%)",
            }, {
                d: "M 56.195312 63.203125 L 13.867188 69.15625 L 13.871094 30.835938 L 56.199219 36.796875 L 56.195312 63.203125",
                fill: "rgb(85.098039%,65.490196%,25.490196%)",
            }, {
                d: "M 34.746094 60.78125 L 50 62.722656 L 50 37.265625 L 34.75 39.207031 L 34.746094 60.78125",
                fill: "rgb(52.941176%,41.176471%,16.078431%)",
            }, {
                d: "M 19.378906 58.824219 L 29.277344 60.082031 L 29.28125 39.902344 L 19.378906 41.164062 L 19.378906 58.824219",
                fill: "rgb(52.941176%,41.176471%,16.078431%)",
            }, {
                d: "M 13.871094 30.835938 L 50.003906 20 L 91.421875 32.429688 L 56.222656 36.800781 L 13.871094 30.835938",
                fill: "rgb(38.431373%,29.019608%,11.764706%)",
            }, {
                d: "M 91.398438 57.402344 L 50 62.628906 L 50 37.265625 L 91.398438 42.539062 L 91.398438 57.402344",
                fill: "rgb(85.098039%,65.490196%,25.490196%)",
            }, {
                d: "M 91.398438 67.582031 L 90.507812 67.621094 L 50.125 79.84375 L 50 80 L 49.996094 100 L 91.398438 79.304688 L 91.398438 67.582031",
                fill: "rgb(85.098039%,65.490196%,25.490196%)",
            }, {
                d: "M 13.867188 69.15625 L 50 80 L 91.398438 67.582031 L 56.195312 63.203125 L 13.867188 69.15625",
                fill: "rgb(98.039216%,84.313725%,56.862745%)",
            }]
        }, {
            id: "aws_divider_1",
            isDivider: true,
        }, {
            id: 'aws_cognito',
            text: 'Amazon Cognito',
            paths: [{
                d: "M 77.007812 19.417969 L 85.625 17.199219 L 85.691406 17.292969 L 85.910156 69.335938 L 85.625 69.617188 L 83.851562 69.695312 L 77.109375 68.644531 L 77.007812 68.378906 L 77.007812 19.417969",
                fill: "rgb(47.843137%,24.313725%,39.607843%)",
            }, {
                d: "M 27.160156 73.234375 L 27.191406 73.238281 L 49.941406 79.847656 L 50 79.890625 L 50.097656 79.972656 L 50.066406 99.78125 L 50 99.867188 L 27.160156 88.769531 L 27.160156 73.234375",
                fill: "rgb(47.843137%,24.313725%,39.607843%)",
            }, {
                d: "M 77.007812 68.378906 L 50.039062 74.839844 L 36.496094 71.570312 L 27.160156 73.234375 L 50 79.890625 L 85.253906 70.347656 L 85.625 69.617188 L 77.007812 68.378906",
                fill: "rgb(81.176471%,69.803922%,75.686275%)",
            }, {
                d: "M 72.839844 26.628906 L 72.621094 26.378906 L 50.246094 19.878906 L 50 19.972656 L 49.773438 19.859375 L 14.566406 30.011719 L 14.375 30.246094 L 14.65625 30.402344 L 22.707031 31.582031 L 22.992188 31.484375 L 49.960938 25.027344 L 63.503906 28.296875 L 72.839844 26.628906",
                fill: "rgb(31.764706%,15.686275%,26.27451%)",
            }, {
                d: "M 22.992188 80.445312 L 14.375 82.527344 L 14.359375 82.476562 L 14.019531 30.628906 L 14.375 30.246094 L 22.992188 31.484375 L 22.992188 80.445312",
                fill: "rgb(75.686275%,48.235294%,61.960784%)",
            }, {
                d: "M 34.628906 60.335938 L 50 62.136719 L 50.117188 61.964844 L 50.179688 37.921875 L 50 37.726562 L 34.628906 39.53125 L 34.628906 60.335938",
                fill: "rgb(47.843137%,24.313725%,39.607843%)",
            }, {
                d: "M 65.371094 60.335938 L 50 62.136719 L 50 37.726562 L 65.371094 39.53125 L 65.371094 60.335938",
                fill: "rgb(75.686275%,48.235294%,61.960784%)",
            }, {
                d: "M 72.839844 26.628906 L 50 19.972656 L 50 0 L 72.839844 11.097656 L 72.839844 26.628906",
                fill: "rgb(75.686275%,48.235294%,61.960784%)",
            }, {
                d: "M 50 0 L 7.191406 20.667969 L 7.191406 79.199219 L 14.375 82.527344 L 14.375 30.246094 L 50 19.972656 L 50 0",
                fill: "rgb(47.843137%,24.313725%,39.607843%)",
            }, {
                d: "M 85.625 17.199219 L 85.625 69.617188 L 50 79.890625 L 50 99.867188 L 92.808594 79.199219 L 92.808594 20.667969 L 85.625 17.199219",
                fill: "rgb(75.686275%,48.235294%,61.960784%)",
            }]
        }, {
            id: 'aws_opsworks',
            text: 'AWS OpsWorks',
            paths: [{
                d: "M 91.164062 51.398438 L 91.425781 50.003906 L 84.746094 50.003906 L 73.292969 83.28125 L 79.820312 85.042969 L 80.410156 84.292969 L 91.164062 51.398438",
                fill: "rgb(29.411765%,38.039216%,17.254902%)",
            }, {
                d: "M 91.425781 50.003906 L 91.425781 79.292969 L 79.792969 85.113281 L 91.425781 50.003906",
                fill: "rgb(45.882353%,61.176471%,24.313725%)",
            }, {
                d: "M 19.472656 84.003906 L 8.835938 51.398438 L 8.574219 50.003906 L 15.023438 50.003906 L 26.570312 83.320312 L 20.183594 85.042969 L 19.472656 84.003906",
                fill: "rgb(45.882353%,61.176471%,24.313725%)",
            }, {
                d: "M 50 70.320312 L 32.65625 47.351562 L 20.375 14.84375 L 50 22.875 L 50.460938 23.992188 L 50.695312 68.277344 L 50 70.320312",
                fill: "rgb(45.882353%,61.176471%,24.313725%)",
            }, {
                d: "M 50 70.320312 L 67.953125 46.742188 L 79.625 14.84375 L 50 22.875 L 50 70.320312",
                fill: "rgb(29.411765%,38.039216%,17.254902%)",
            }, {
                d: "M 91.425781 32.601562 L 91.425781 20.652344 L 79.625 14.84375 L 50 70.320312 L 50 99.902344 L 71.914062 88.949219 L 91.425781 32.601562",
                fill: "rgb(45.882353%,61.176471%,24.313725%)",
            }, {
                d: "M 50 50.003906 L 50.117188 49.734375 L 50.160156 0.148438 L 50 0 L 28.160156 10.945312 L 50 50.003906",
                fill: "rgb(29.411765%,38.039216%,17.254902%)",
            }, {
                d: "M 8.574219 50.003906 L 8.574219 79.292969 L 20.210938 85.113281 L 8.574219 50.003906",
                fill: "rgb(29.411765%,38.039216%,17.254902%)",
            }, {
                d: "M 50 50.003906 L 50 0 L 71.84375 10.945312 L 50 50.003906",
                fill: "rgb(45.882353%,61.176471%,24.313725%)",
            }, {
                d: "M 8.574219 32.601562 L 8.574219 20.652344 L 20.375 14.84375 L 50 70.320312 L 50 99.902344 L 28.085938 88.949219 L 8.574219 32.601562",
                fill: "rgb(29.411765%,38.039216%,17.254902%)",
            }]
        }, {
            id: 'aws_route53',
            text: 'Amazon Route 53',
            paths: [{
                d: "M 32.539062 90.984375 L 49.988281 99.710938 L 51.695312 98.4375 L 50.976562 1.160156 L 49.988281 0 L 32.539062 8.726562 L 32.539062 90.984375",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 67.441406 90.984375 L 49.988281 99.710938 L 49.988281 0 L 67.441406 8.726562 L 67.441406 90.984375",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 43.410156 36.292969 L 37.285156 37.1875 L 8.710938 33.964844 L 8.832031 33.648438 L 13.46875 32.257812 L 13.960938 32.539062 L 14.074219 32.257812 L 43.226562 35.664062 L 43.410156 36.292969",
                fill: "rgb(41.960784%,22.745098%,9.803922%)",
            }, {
                d: "M 8.710938 20.640625 L 13.960938 18.015625 L 13.960938 32.539062 L 8.710938 33.964844 L 8.710938 20.640625",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 91.289062 42.277344 L 62.042969 43.847656 L 56.570312 43.472656 L 57.601562 43.042969 L 86.109375 41.410156 L 91.289062 42.277344",
                fill: "rgb(41.960784%,22.745098%,9.803922%)",
            }, {
                d: "M 43.410156 36.292969 L 13.960938 32.539062 L 13.960938 18.015625 L 43.410156 24.921875 L 43.410156 36.292969",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }, {
                d: "M 86.019531 26.523438 L 56.570312 31.585938 L 56.570312 43.472656 L 86.019531 41.707031 L 86.1875 41.371094 L 86.128906 26.792969 L 86.019531 26.523438",
                fill: "rgb(61.568627%,31.372549%,14.509804%)",
            }, {
                d: "M 91.289062 42.277344 L 86.019531 41.59375 L 86.019531 26.523438 L 91.289062 28.453125 L 91.289062 42.277344",
                fill: "rgb(96.470588%,52.156863%,21.176471%)",
            }]
        }, {
            id: 'aws_ses',
            text: 'Amazon SES',
            paths: [{
                d: "M 27.445312 15.921875 L 7.191406 48.164062 L 27.445312 80.414062 L 27.796875 80.160156 L 27.539062 15.988281 L 27.445312 15.921875",
                fill: "rgb(52.941176%,41.176471%,16.078431%)",
            }, {
                d: "M 50.0625 74.617188 L 27.445312 80.414062 L 27.445312 15.921875 L 50.0625 21.714844 L 50.0625 74.617188",
                fill: "rgb(85.098039%,65.490196%,25.490196%)",
            }, {
                d: "M 92.800781 24.035156 L 81.898438 25.839844 L 56.867188 0 L 44.425781 5.449219 L 46.066406 8.511719 L 37.257812 12.03125 L 37.257812 93.445312 L 50.0625 99.851562 L 50.273438 99.683594 L 50.078125 15.992188 L 77.214844 57.117188 L 92.800781 24.035156",
                fill: "rgb(52.941176%,41.176471%,16.078431%)",
            }, {
                d: "M 56.867188 0 L 90.207031 16.667969 L 77.023438 40.585938 L 56.867188 0",
                fill: "rgb(85.098039%,65.490196%,25.490196%)",
            }, {
                d: "M 92.800781 24.035156 L 92.808594 78.460938 L 50.0625 99.851562 L 50.058594 6.917969 L 77.023438 55.84375 L 92.800781 24.035156",
                fill: "rgb(85.098039%,65.490196%,25.490196%)",
            }]
        }, {
            id: 'aws_waf',
            text: 'AWS WAF',
            paths: [{
                d: "M 8.710938 55.925781 L 9.027344 56.09375 L 14.023438 56.660156 L 20.300781 56.3125 L 20.574219 56.167969 L 15.007812 55.683594 Z M 8.710938 55.925781",
                fill: "rgb(71.372549%,78.823529%,61.176471%)",
            }, {
                d: "M 50 0.226562 L 32.5625 8.941406 L 32.5625 64.914062 L 50 68.113281 L 50.597656 67.304688 L 50.597656 1.660156 Z M 50 0.226562",
                fill: "rgb(29.803922%,38.039216%,17.254902%)",
            }, {
                d: "M 50 0.226562 L 50 70.449219 L 67.4375 65.246094 L 67.4375 8.941406 Z M 50 0.226562",
                fill: "rgb(46.27451%,60.784314%,24.705882%)",
            }, {
                d: "M 79.425781 56.167969 L 79.722656 56.367188 L 85.960938 56.714844 L 91.011719 56.140625 L 91.289062 55.925781 L 84.992188 55.683594 Z M 79.425781 56.167969",
                fill: "rgb(71.372549%,78.823529%,61.176471%)",
            }, {
                d: "M 79.425781 67.792969 L 85.960938 68.640625 L 86.136719 68.316406 L 86.136719 56.898438 L 85.960938 56.53125 L 79.425781 56.167969 Z M 79.425781 67.792969",
                fill: "rgb(29.803922%,38.039216%,17.254902%)",
            }, {
                d: "M 20.574219 67.792969 L 14.039062 68.640625 L 13.925781 68.339844 L 13.925781 56.726562 L 14.039062 56.53125 L 20.574219 56.167969 Z M 20.574219 67.792969",
                fill: "rgb(46.27451%,60.784314%,24.705882%)",
            }, {
                d: "M 49.273438 67.308594 L 20.332031 62.222656 L 14.039062 62.828125 L 14.324219 63.113281 L 41.816406 68.683594 L 42.128906 68.519531 Z M 49.273438 67.308594",
                fill: "rgb(71.372549%,78.823529%,61.176471%)",
            }, {
                d: "M 8.710938 61.738281 L 8.710938 79.292969 L 37.648438 93.804688 L 37.648438 93.824219 L 50 100 L 50.515625 99.03125 L 50.515625 60.691406 L 50 59.484375 L 37.648438 58.273438 L 37.648438 67.59375 L 14.039062 62.816406 L 14.039062 56.53125 L 8.710938 55.925781 Z M 8.710938 61.738281",
                fill: "rgb(29.803922%,38.039216%,17.254902%)",
            }, {
                d: "M 50 67.429688 L 57.023438 68.640625 L 57.925781 68.675781 L 85.4375 63.152344 L 85.960938 62.828125 L 79.785156 62.222656 Z M 50 67.429688",
                fill: "rgb(71.372549%,78.823529%,61.176471%)",
            }, {
                d: "M 85.960938 56.53125 L 85.960938 62.816406 L 62.351562 67.59375 L 62.351562 57.863281 L 50 59.074219 L 50 100 L 91.289062 79.292969 L 91.289062 55.925781 Z M 85.960938 56.53125",
                fill: "rgb(46.27451%,60.784314%,24.705882%)",
            }, {
                d: "M 62.351562 58.832031 L 50 57.863281 L 37.648438 58.832031 L 50 60.042969 Z M 62.351562 58.832031",
                fill: "rgb(71.372549%,78.823529%,61.176471%)",
            }]
        }, 
        // {
        //     id: "test",
        //     text: "Text",
        //     image: {
        //         // src: "https://image.shutterstock.com/z/stock-vector-flat-data-storage-icon-for-web-221924383.jpg",
        //         // src: "https://cdns.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-database-1.png"
        //         src: "https://www.giantbomb.com/a/uploads/original/15/153607/3299603-mario.jpg"
        //     },
        // }
    ]
}];

export default menuDefs;
