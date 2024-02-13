document.addEventListener('DOMContentLoaded', () => {
    const storySection = document.getElementById('story');
    const dungeonImage = document.getElementById('dungeon-doors');

    // 초기 스토리를 GPT API로부터 가져오는 함수
    async function loadInitialStory() {
        const initialStory = await getStoryFromGPT("던전에 오신 것을 환영합니다. 당신의 모험이 시작됩니다...");
        storySection.innerHTML = `<p>${initialStory}</p>`;
    }

    // GPT API로부터 스토리를 가져오는 함수
    async function getStoryFromGPT(prompt) {
        const response = await fetch("https://open-api.jejucodingcamp.workers.dev/chat", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({prompt: prompt})
        });

        if (!response.ok) {
            throw new Error(`API 요청 실패: ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices[0].text.trim(); // API에서 나레이션 텍스트를 가져옵니다.
    }

    // 이미지(문) 클릭 이벤트 처리
    dungeonImage.addEventListener('click', async () => {
        // 무작위로 문을 선택하는 것을 가정합니다.
        const doors = ['문 1', '문 2', '문 3'];
        const selectedDoor = doors[Math.floor(Math.random() * doors.length)];
        
        const prompt = `${selectedDoor}가 선택되었습니다. 무슨 일이 일어날까요?`;
        const storyUpdate = await getStoryFromGPT(prompt);
        storySection.innerHTML = `<p>${storyUpdate}</p>`;
    });

    // 페이지 로드 시 초기 스토리 로딩
    loadInitialStory();
});
