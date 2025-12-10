// src/lib/server/db.js
import { supabase } from '$lib/supabaseClient';

// ====================================================================
// 1. Voting Page Data Fetcher (Submissions, Grouping, and Vote Counts)
//    Used by: src/routes/vote/+page.server.js
// ====================================================================

/**
 * Fetches all shortlisted submissions, challenge titles, and calculates vote counts.
 * @returns {Promise<Array>} List of formatted submissions ready for display.
 */
export async function fetchGroupedSubmissions() {
    // 1. Fetch all challenges to build a title map
    const { data: challenges, error: challengeError } = await supabase
        .from('challenges') 
        .select('id, title'); 

    if (challengeError) {
        console.error("Failed to fetch challenges for submission grouping:", challengeError);
        return [];
    }

    const challengeMap = challenges.reduce((map, c) => {
        map[c.id] = c.title;
        return map;
    }, {});


    // 2. Fetch all votes to calculate counts
    const { data: allVotes, error: votesError } = await supabase
        .from('votes')
        .select('submission_id');
    
    if (votesError) {
        // Log, but continue, as submissions can still be displayed with 0 votes
        console.error("Failed to fetch votes for counting:", votesError);
    }
    
    // Calculate the vote count for each submission ID
    const voteCountMap = (allVotes || []).reduce((map, vote) => {
        map[vote.submission_id] = (map[vote.submission_id] || 0) + 1;
        return map;
    }, {});


    // 3. Fetch all shortlisted submissions
    const { data: submissionsData, error: submissionsError } = await supabase
        .from('submissions')
        .select(`id, solution_text, challenge_id`) 
        .eq('is_shortlisted', true);

    if (submissionsError) {
        console.error("Failed to fetch submissions:", submissionsError);
        return [];
    }

    // 4. Combine and format the data
    const formattedSubmissions = submissionsData
        .filter(sub => challengeMap[sub.challenge_id]) 
        .map(sub => ({
            id: sub.id,
            solution_text: sub.solution_text,
            challenge_id: sub.challenge_id,
            challenge_title: challengeMap[sub.challenge_id], 
            vote_count: voteCountMap[sub.id] || 0, 
        }));

    return formattedSubmissions;
}


// ====================================================================
// 2. Policy Briefs Page Data Fetcher (Briefs Grouping)
//    Used by: src/routes/briefs/+page.server.js
// ====================================================================

/**
 * Fetches all policy briefs and groups them by challenge title.
 * @returns {Promise<Array>} List of challenges, each containing an array of briefs.
 */
export async function fetchBriefsGroupedByChallenge() {
    // 1. Fetch Challenges (Titles for grouping)
    const { data: challenges, error: challengeError } = await supabase
        .from('challenges')
        .select('id, title'); 

    if (challengeError) {
        console.error("Failed to fetch challenges for briefs grouping:", challengeError);
        return [];
    }

    const challengeMap = challenges.reduce((map, c) => {
        map[c.id] = c.title;
        return map;
    }, {});


    // 2. Fetch Policy Briefs
    const { data: briefsData, error: briefsError } = await supabase
        .from('policybriefs')
        .select(`
            id, 
            title, 
            description, 
            delivery_date, 
            status, 
            stakeholder_acknowledged, 
            challenge_id, 
            pdf_url 
        `) 
        .order('delivery_date', { ascending: false });

    if (briefsError) {
        console.error('Public Policy Briefs Load Error:', briefsError);
        return [];
    }
    
    // 3. Group and format data
    const groupedBriefsObject = briefsData
        .filter(brief => challengeMap[brief.challenge_id]) 
        .reduce((groups, brief) => {
            const challengeTitle = challengeMap[brief.challenge_id];
            
            if (!groups[challengeTitle]) {
                groups[challengeTitle] = {
                    title: challengeTitle,
                    id: brief.challenge_id,
                    briefs: []
                };
            }
            groups[challengeTitle].briefs.push(brief);
            return groups;
        }, {});


    return Object.values(groupedBriefsObject) || [];
}