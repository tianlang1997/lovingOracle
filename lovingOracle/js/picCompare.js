function getHistogram(imageData) {
    var arr = [];
    for (var i = 0; i < 64; i++) {
        arr[i] = 0;
    }
    var data = imageData.data;
    var pow4 = Math.pow(4, 2);
    for (var i = 0, len = data.length; i < len; i += 4) {
        var red = (data[i] / 64) | 0;
        var green = (data[i + 1] / 64) | 0;
        var blue = (data[i + 2] / 64) | 0;
        var index = red * pow4 + green * 4 + blue;
        arr[index]++;
    }
    return arr;
}
function cosine(arr1, arr2) {
    var axb = 0,
        a = 0,
        b = 0;
    for (var i = 0, len = arr1.length; i < len; i++) {
        axb += arr1[i] * arr2[i];
        a += arr1[i] * arr1[i];
        b += arr2[i] * arr2[i];
    }
    return axb / (Math.sqrt(a) * Math.sqrt(b));
}
function gray(imgData) {
    var data = imgData.data;
    for (var i = 0, len = data.length; i < len; i += 4) {
        var gray = parseInt((data[i] + data[i + 1] + data[i + 2]) / 3);
        data[i + 2] = data[i + 1] = data[i] = gray;
    }
    return imgData;
}