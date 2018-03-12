/**
 * List a YouTube HTTP API resource.
 *
 * @param {string} resource - The path of the resource.
 * @param {object} params - The API parameters.
 * @param {function} success - The function to be called on success.
 *
 * @return {Void}
 */
function youtubeAPI(resource, params, success) {
  params.key = apiKey;
  console.log(resource, params, success)
  $.getJSON(
    'https://www.googleapis.com/youtube/v3/' + resource,
    params,
    success
  ).fail((xhr, textStatus, error) => {
    showToast('There was an error calling the YouTube API.');
    console.log(error);
    stopLoadingAnimation();
  });
}

/**
* Use youtube-dl to get the info for a video.
*
* @param {string} videoId - The video Id to get info from.
* @param {function} callback - The callback function when the call is finished.
*
* @return {Void}
*/
function youtubedlGetInfo(videoId, callback) {
  let url = 'https://youtube.com/watch?v=' + videoId;
  let options = ['--all-subs', '--geo-bypass'];

  youtubedl.getInfo(url, options, function(err, info) {
    if (err){
      showToast('There was an issue calling youtube-dl.');
      stopLoadingAnimation();
      console.log(err);
    }

    console.log('Success');
    callback(info);
  });
}