function generateLink() {
    const pathInput = document.getElementById('s3path').value;
    const regionInput = document.getElementById('region').value || 'us-west-2';
    const result = document.getElementById('result');

    if (!pathInput.startsWith("s3://")) {
        result.textContent = "Invalid S3 path";
        return;
    }

    const bucket = pathInput.match(/(?<=s3:\/\/)[^\/]+/)[0];
    const key = pathInput.split(bucket + '/')[1];

    let link;
    if (key.endsWith("/")) {
        link = `https://s3.console.aws.amazon.com/s3/buckets/${bucket}?region=${regionInput}&prefix=${key}&showversions=false`;
    } else {
        link = `https://s3.console.aws.amazon.com/s3/object/${bucket}/${key}?region=${regionInput}&tab=overview`;
    }

    result.textContent = link;
}
