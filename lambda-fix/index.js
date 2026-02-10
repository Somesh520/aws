const { S3Client, GetObjectCommand, PutObjectCommand } = require("@aws-sdk/client-s3");
const Jimp = require("jimp"); // Sharp ki jagah Jimp
const s3 = new S3Client();

exports.handler = async (event) => {
    for (const record of event.Records) {
        try {
            // SQS message body parse karna (agar SQS trigger hai)
            const body = JSON.parse(record.body);
            // S3 Event structure nikalna
            const s3Record = body.Records[0].s3;
            
            const srcBucket = s3Record.bucket.name;
            const srcKey = decodeURIComponent(s3Record.object.key.replace(/\+/g, " "));
            
            const destBucket = "resized-image-demo"; 
            const destKey = `resized-${srcKey}`;

            console.log(`Starting Resize with Jimp: ${srcKey}`);

            // 1. Image Download
            const getObj = await s3.send(new GetObjectCommand({ Bucket: srcBucket, Key: srcKey }));
            
            // Stream ko Buffer mein convert karna
            const chunks = [];
            for await (const chunk of getObj.Body) { chunks.push(chunk); }
            const inputBuffer = Buffer.concat(chunks);

            // 2. Jimp se Resize (No Binary Dependency)
            const image = await Jimp.read(inputBuffer);
            
            // Resize logic
            image.resize(300, Jimp.AUTO); // Width 200, Height Auto
            
            // Wapas Buffer mein convert
            const outputBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);

            // 3. Upload
            await s3.send(new PutObjectCommand({
                Bucket: destBucket,
                Key: destKey,
                Body: outputBuffer,
                ContentType: "image/jpeg"
            }));

            console.log(`FINAL SUCCESS: ${destKey} uploaded to ${destBucket}`);

        } catch (error) {
            console.error("RESIZE ERROR:", error);
            // Error throw mat karna agar loop mein ho, nahi to SQS infinite retry karega
        }
    }
};