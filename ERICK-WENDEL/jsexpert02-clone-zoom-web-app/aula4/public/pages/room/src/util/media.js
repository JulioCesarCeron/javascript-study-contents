class Media { 
	async getCamera(audio = true, video = true){
		return await navigator.mediaDevices.getUserMedia({
			video,
			audio
		})
	}
}