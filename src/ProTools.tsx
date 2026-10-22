import { useMemo, useState } from 'react';
import { Copy, Image, Scissors, Tags, Type, Wand2 } from 'lucide-react';

type DraftPack = {
  titles: string[];
  hook: string;
  description: string;
  hashtags: string;
  thumbnailBrief: string;
  repurposePlan: string;
};

export default function ProTools() {
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [keywords, setKeywords] = useState('');
  const [tone, setTone] = useState('Curious and clear');
  const [notice, setNotice] = useState('');
  const [draft, setDraft] = useState<DraftPack | null>(null);

  const keywordList = useMemo(
    () => keywords.split(',').map((item) => item.trim()).filter(Boolean),
    [keywords],
  );

  function generate() {
    const subject = topic.trim().replace(/[.!?]+$/, '');
    if (!subject) {
      setNotice('Enter a video topic first.');
      return;
    }

    const target = audience.trim() || 'your audience';
    const tags = [...new Set([subject, ...keywordList]
      .map((item) => item.toLowerCase().replace(/[^a-z0-9]+/g, ''))
      .filter(Boolean))]
      .slice(0, 8)
      .map((item) => '#' + item);

    setDraft({
      titles: [
        'What I Wish I Knew About ' + subject,
        subject + ': A Beginner-Friendly Guide',
        'I Tried ' + subject + ' — Here Is What I Learned',
        '5 Things to Know Before ' + subject,
        'The Truth About ' + subject,
      ],
      hook: tone + ': “If you have wondered about ' + subject.toLowerCase() + ', here is the part most people miss…”',
      description: subject + '\n\nIn this video, I break down ' + subject.toLowerCase() +
        ' for ' + target + '. Expect a practical walkthrough and key takeaways.\n\n' +
        'CHAPTERS\n00:00 Intro\n00:30 The main idea\n02:00 Examples and takeaways\n\n' +
        (keywordList.length ? 'TOPICS\n' + keywordList.join(', ') + '\n\n' : '') +
        'If this was helpful, share your question in the comments and subscribe for more.\n\n' +
        tags.slice(0, 3).join(' '),
      hashtags: tags.join(' '),
      thumbnailBrief: 'THUMBNAIL BRIEF\nSubject: ' + subject + '\nAudience: ' + target +
        '\nVisual: one clear subject, strong contrast, simple background\nText overlay: 2–4 curiosity-driven words\n' +
        'Keep the subject and text readable on a phone. Avoid clutter and misleading claims.',
      repurposePlan: 'LONG VIDEO: Explain ' + subject + ' with context and examples.\n' +
        'SHORT 1: One surprising fact about ' + subject + '.\n' +
        'SHORT 2: A common beginner mistake.\n' +
        'COMMUNITY POST: Ask ' + target + ' their biggest question about ' + subject.toLowerCase() + '.\n' +
        'FOLLOW-UP: Answer the strongest audience question in a dedicated video.',
    });
    setNotice('Draft pack generated. Edit each result before publishing.');
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setNotice('Copied to clipboard.');
    } catch {
      setNotice('Clipboard access is unavailable. Select the text and copy it manually.');
    }
  }

  return (
    <section className="pro-tools">
      <div className="tool-intro">
        <span className="tool-eyebrow"><Wand2 size={15} /> CREATOR TOOLBOX</span>
        <h2>Make the next upload easier.</h2>
        <p>Build editable starting points from your own topic. These local tools do not fetch YouTube trends or publish anything.</p>
      </div>
      <div className="tool-form">
        <label>Video topic<input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="e.g. building a home server" /></label>
        <label>Target audience<input value={audience} onChange={(event) => setAudience(event.target.value)} placeholder="e.g. beginners on a budget" /></label>
        <label>Keywords, separated by commas<input value={keywords} onChange={(event) => setKeywords(event.target.value)} placeholder="homelab, servers, beginner tech" /></label>
        <label>Hook style<select value={tone} onChange={(event) => setTone(event.target.value)}><option>Curious and clear</option><option>Energetic and playful</option><option>Calm and educational</option><option>Direct and practical</option></select></label>
        <button className="primary" onClick={generate}><Wand2 size={16} /> Build my draft pack</button>
      </div>
      {notice && <p className="tool-notice" role="status">{notice}</p>}
      {draft && <div className="tool-results">
        <article><h3><Type size={17} /> Title studio</h3><ul>{draft.titles.map((item) => <li key={item}>{item}<button className="tool-copy" onClick={() => copy(item)} aria-label="Copy title"><Copy size={14} /></button></li>)}</ul><button className="secondary" onClick={() => copy(draft.titles.join('\n'))}>Copy all titles</button></article>
        <article><h3>Hook builder</h3><textarea value={draft.hook} onChange={(event) => setDraft({ ...draft, hook: event.target.value })} /><button className="secondary" onClick={() => copy(draft.hook)}>Copy hook</button></article>
        <article><h3>Description builder</h3><textarea value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} /><button className="secondary" onClick={() => copy(draft.description)}>Copy description</button></article>
        <article><h3><Tags size={17} /> Hashtag organizer</h3><textarea value={draft.hashtags} onChange={(event) => setDraft({ ...draft, hashtags: event.target.value })} /><button className="secondary" onClick={() => copy(draft.hashtags)}>Copy hashtags</button></article>
        <article><h3><Image size={17} /> Thumbnail brief</h3><textarea value={draft.thumbnailBrief} onChange={(event) => setDraft({ ...draft, thumbnailBrief: event.target.value })} /><button className="secondary" onClick={() => copy(draft.thumbnailBrief)}>Copy brief</button></article>
        <article><h3><Scissors size={17} /> Repurposing planner</h3><textarea value={draft.repurposePlan} onChange={(event) => setDraft({ ...draft, repurposePlan: event.target.value })} /><button className="secondary" onClick={() => copy(draft.repurposePlan)}>Copy plan</button></article>
      </div>}
    </section>
  );
}
