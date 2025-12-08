<script>
    /** @type {{id: string, topic: string, content_text: string, category: string, media_url: string}} */
    export let item;

    // Determine if the media link is a YouTube URL for embedding
    $: isYouTube = item.media_url && item.media_url.includes('youtube.com');
    
    // Simple function to get the YouTube embed ID
    function getYouTubeEmbedUrl(url) {
        const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([^&]+)/);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}`;
        }
        return null;
    }

    $: embedUrl = isYouTube ? getYouTubeEmbedUrl(item.media_url) : null;
</script>

<div class="education-item">
    <div class="content-body">
        <h4>{item.topic}</h4>
        <p>{item.content_text}</p>
        
        {#if item.media_url && !isYouTube}
            <a href={item.media_url} target="_blank" rel="noopener noreferrer" class="resource-link">
                View External Resource Link 🔗
            </a>
        {/if}
    </div>

    {#if isYouTube && embedUrl}
        <div class="media-container">
            <iframe 
                src={embedUrl} 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen
                title={item.topic}
            ></iframe>
        </div>
    {/if}
</div>

<style>
    .education-item {
        background-color: var(--color-white);
        border: 1px solid var(--color-border-light);
        border-radius: 8px;
        padding: 25px;
        margin-bottom: 25px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    }
    
    .education-item h4 {
        color: var(--color-primary-accent);
        font-size: 1.4em;
        margin-bottom: 10px;
        padding-bottom: 5px;
        border-bottom: 2px solid rgba(0, 122, 51, 0.1);
    }

    .education-item p {
        color: var(--color-text-dark);
        margin-bottom: 15px;
    }

    .resource-link {
        display: inline-block;
        color: var(--color-secondary-accent);
        text-decoration: none;
        font-weight: 600;
        margin-top: 5px;
    }

    /* --- Media Container Styles (for YouTube Embed) --- */
    .media-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
        height: 0;
        overflow: hidden;
        border-radius: 6px;
        margin-top: 15px;
    }

    .media-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
    }
</style>