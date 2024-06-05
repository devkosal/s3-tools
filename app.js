function generateLink() {
    const pathInput = document.getElementById('s3path').value;
    const regionSelect = document.getElementById('region');
    const regionInput = regionSelect.value;
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

    result.innerHTML = `<a href="${link}" target="_blank">${link}</a>`;

    // Save region to cookies
    document.cookie = "region=" + regionInput + ";path=/;max-age=" + 60 * 60 * 24 * 30; // Expires in 30 days
}

// Load region from cookies
window.onload = function() {
    const region = document.cookie.split('; ').find(row => row.startsWith('region='));
    if (region) {
        document.getElementById('region').value = region.split('=')[1];
    }
}