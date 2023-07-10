const requestSongsPromise = new Promise((resolve, reject) => {
    const dummyResponse = JSON.stringify([
        {
            title: "song title",
            artist: [{name: "artist name 1"}],
            duration: 200,
        }
    ]);

    setTimeout(() => {
        const random = Math.random();
        const isError = random <= 0.2;

        if (!isError) resolve(dummyResponse);
        else reject(new Error('an error occurred'));
    }, 2000);
});

const handleSongRequest = () => {
    requestSongsPromise.then(response => {
        console.log(response);
    }).catch(error => {
        console.error(error)
    });
}

const handleSongRequestAsync = async () => {
    try {
        const songResponse = await requestSongsPromise;
        console.log(songResponse);
    } catch (error) {
        console.error(error);
    }
}

handleSongRequest();
handleSongRequestAsync();
