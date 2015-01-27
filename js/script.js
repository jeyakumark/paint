    // Wait for PhoneGap to connect with the device
    document.addEventListener("deviceready",onDeviceReady,false);
    
    var pictureSource;   // picture source
	var destinationType; // sets the format of returned value
    
    // PhoneGap is ready to be used!
    function onDeviceReady() {
	    var capture_btn = $('#capture');
	    var getImg_btn = $('#getImg');
	    var captureVideo_btn = $('#captureVideo');
	     
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;
            
        capture_btn.click(function(){
        	capturePhoto();
        });
        
        getImg_btn.click(function(){
        	getImage(pictureSource.SAVEDPHOTOALBUM);
        });
        
        captureVideo_btn.click(function(){
        	captureVideo();
        });
		
		var getX = $('input[name=x]');
		var getY = $('input[name=y]');
		var getWidth = $('input[name=width]');
		var getHeight = $('input[name=height]');
		
		getX.change(function() {
			//console.log("X:" + getX.val());
		});
			
		getY.change(function() {
			//console.log("Y:" + getY.val());
		});
		
		getWidth.change(function() {
			//console.log("Width:" + getWidth.val());
		});
		
		getHeight.change(function() {
			//console.log("Height:" + getHeight.val());
		});
		
		var canvas = document.getElementById("myCanvas");
		var context = canvas.getContext("2d");
		
		var cropBtn = $('#crop');
		cropBtn.click(function(){
			var imageSrc = $("#image").attr('src');
			crop(getX, getY, getWidth, getHeight, imageSrc);
		});		
		
		// Cropped Image
		function crop(getX, getY, getWidth, getHeight, imageSrc){
			var imageObj = new Image();
			
			imageObj.onload = function(){
					
					var sourceX = getX.val();
					var sourceY = getY.val();
					var sourceWidth = getWidth.val();
					var sourceHeight = getHeight.val();
					var destWidth = sourceWidth;
					var destHeight = sourceHeight;
					var destX = 0;
					var destY = canvas.height / 2;
			 
					context.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, 
						destX, destY, destWidth, destHeight);
				};
			imageObj.src = imageSrc;
		}	
		
    }

    // Called when a photo is successfully retrieved
    function onPhotoDataSuccess(imageData) {
      // Uncomment to view the base64 encoded image data
      // console.log(imageData);
    }

    // Called when a photo is successfully retrieved
    function onPhotoURISuccess(imageURI) {
      // Uncomment to view the image file URI 
      // console.log(imageURI);

      // Get image handle
      var image = document.getElementById('image');
      var imgCnt = document.getElementById('image_container');

	  // Unhide image container
	  imgCnt.style.display = 'block';
	  
      // Unhide image elements
      image.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules are used to resize the image
      image.src = imageURI;
    }

    // A button will call this function
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50 });
    }

    // A button will call this function
    function getImage(source) {
      // Retrieve image file location from specified source
      navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50, 
        destinationType: destinationType.FILE_URI,
        sourceType: source });
    }

    // Called if something bad happens.
    function onFail(message) {
      alert('Failed because: ' + message);
    }
    
     // Called when capture operation is finished
    function captureSuccess(mediaFiles) {
          
    }

    // Called if something bad happens.
    function captureError(error) {
        var msg = 'An error occurred during capture: ' + error.code;
        navigator.notification.alert(msg, null, 'Uh oh!');
    }
    
	function captureVideo() {
        // Launch device video recording application, 
        // allowing user to capture up to 2 video clips
        navigator.device.capture.captureVideo(captureSuccess, captureError, {limit: 2});
    }