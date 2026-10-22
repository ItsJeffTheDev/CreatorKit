import { useEffect, useMemo, useState } from "react";
import { Copy, Download, FileText, Image, Lightbulb, RefreshCw, Scissors, Tags, Type, WandSparkles, Check, BookmarkPlus, Trash2 } from "lucide-react";

type DraftPack = {
  id: string;
  topic: string;
  createdAt: string;
  platform: string;
  titles: string[];
  hooks: string[];
  description: string;
  hashtags: string;
  thumbnailBrief: string;
  outline: string;
  shortIdeas: string;
  ctas: string;
};
const SAVED_KEY = "creatorkit.protools.saved.v2";
const tones = ["Curious and clear", "Energetic and playful", "Calm and educational", "Direct and practical", "Story-driven", "Funny but honest"];

function cleanTopic(value: string) { return value.trim().replace(/[.!?]+$/, ""); }
function slugTag(value: string) { return value.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "").slice(0, 28); }

export default function ProTools() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [keywords, setKeywords] = useState("");
  const [platform, setPlatform] = useState("YouTube video");
  const [tone, setTone] = useState(tones[0]);
  const [goal, setGoal] = useState("Teach something useful");
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState<DraftPack | null>(null);
  const [saved, setSaved] = useState<DraftPack[]>(() => {
    try { const data = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); return Array.isArray(data) ? data : []; }
    catch { return []; }
  });
  const [showSaved, setShowSaved] = useState(false);
  const keywordList = useMemo(() => [...new Set(keywords.split(",").map(x => x.trim()).filter(Boolean))].slice(0, 12), [keywords]);

  useEffect(() => { try { localStorage.setItem(SAVED_KEY, JSON.stringify(saved)); } catch { setNotice("Storage is full. Export your saved packs, then remove older ones."); } }, [saved]);

  function generate() {
    const subject = cleanTopic(topic);
    if (!subject) { setNotice("Add a video topic first. A few words is enough."); return; }
    const target = audience.trim() || "people who are new to this topic";
    const safeSubject = subject.charAt(0).toLowerCase() + subject.slice(1);
    const keyTerms = [...new Set([subject, ...keywordList].map(slugTag).filter(Boolean))].slice(0, 8);
    const tags = keyTerms.map(x => "#" + x);
    const isShort = platform === "YouTube Short" || platform === "TikTok / Reel";
    const titles = [
      "How to " + subject + " (Beginner-Friendly Guide)",
      "I Tried " + subject + " — Here's What Happened",
      "5 Things I Wish I Knew About " + subject,
      "The Biggest Mistake People Make With " + subject,
      subject + ": What Actually Matters",
      "Before You Try " + subject + ", Watch This"
    ];
    const hooks = [
      "Most people approach " + safeSubject + " the hard way. Let me show you a simpler starting point.",
      "If you're " + target + ", this is what I would learn first about " + safeSubject + ".",
      "I wanted to understand " + safeSubject + ", so let's break down what works, what doesn't, and why.",
      "By the end, you'll have a practical next step for " + safeSubject + "—without the unnecessary jargon."
    ];
    const description = subject + "\n\nIn this " + (isShort ? "short video" : "video") + ", we'll explore " + safeSubject + " for " + target + ". The goal: " + goal.toLowerCase() + ".\n\n" +
      (keywordList.length ? "WHAT WE'LL COVER\n" + keywordList.map((x,i) => (i+1) + ". " + x).join("\n") + "\n\n" : "") +
      (isShort ? "Have a question or another tip? Leave it in the comments.\n\n" : "CHAPTERS (replace these with your real timestamps)\n00:00 Introduction\n00:30 The basics\n02:00 Practical example\n03:00 Key takeaways\n\n") +
      "This description is a starting point—check that every detail matches the finished video.\n\n" + tags.slice(0,3).join(" ");
    const outline = "VIDEO OUTLINE — " + subject + "\n\n1. OPENING HOOK (first 5–15 seconds)\nState the problem or promise clearly.\n\n2. CONTEXT\nWhy should " + target + " care? Define any jargon.\n\n3. MAIN POINTS\n" + (keywordList.length ? keywordList.map((x,i) => (i+1) + ". " + x + " — explain it and give an example.").join("\n") : "1. Explain the core idea.\n2. Demonstrate it with a real example.\n3. Share a common mistake and how to avoid it.") + "\n\n4. RECAP\nSummarize the 2–3 most useful takeaways.\n\n5. CLOSE\nAsk one specific question and give a clear next step.";
    const thumbnailBrief = "THUMBNAIL CONCEPT — " + subject + "\n\nMain subject: one recognizable object, person, or result\nComposition: subject large; leave space for 2–4 words\nText ideas: “START HERE” / “WORTH IT?” / “I LEARNED THIS”\nContrast: bright subject against a simple dark or uncluttered background\nMobile check: zoom out until thumbnail is small; is the idea still obvious?\nIntegrity check: show something that actually appears in the video.";
    const shortIdeas = "REPURPOSING PLAN — " + subject + "\n\n1. QUICK TIP: one useful thing a viewer can apply today.\n2. COMMON MISTAKE: show the mistake, then the fix.\n3. BEFORE / AFTER: demonstrate a real result, if available.\n4. FAQ: answer the strongest question from comments.\n5. COMMUNITY POST: ask “What's your biggest question about " + safeSubject + "?”";
    const ctas = "CALL-TO-ACTION OPTIONS\n\nConversation: “What's one thing you'd add? Tell me below.”\nNext video: “Want a deeper walkthrough? Tell me which part to cover.”\nCommunity: “What should I test or explain next?”\nSubscribe: “If practical videos like this help, subscribe for the next one.”\n\nChoose one CTA that fits the video; you don't need to use all of them.";
    setDraft({ id: crypto.randomUUID(), topic: subject, createdAt: new Date().toISOString(), platform, titles, hooks, description, hashtags: tags.join(" "), thumbnailBrief, outline, shortIdeas, ctas });
    setNotice("Your editable idea pack is ready. Review the wording and replace any placeholder details before publishing.");
  }

  async function copy(value: string) {
    try {
      if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(value); setNotice("Copied to clipboard."); return; }
      const area = document.createElement("textarea"); area.value = value; area.style.position = "fixed"; area.style.opacity = "0"; document.body.appendChild(area); area.select();
      const ok = document.execCommand("copy"); area.remove(); setNotice(ok ? "Copied to clipboard." : "Copy was blocked. Select the text and copy it manually.");
    } catch { setNotice("Copy was blocked. Select the text and copy it manually."); }
  }
  function savePack() {
    if (!draft) return;
    setSaved(previous => [draft, ...previous.filter(item => item.id !== draft.id)].slice(0, 30));
    setNotice("Saved to your local CreatorKit toolbox.");
  }
  function exportPack(pack: DraftPack | null = draft) {
    if (!pack) { setNotice("Generate or open a pack first."); return; }
    const text = [pack.topic, "Platform: " + pack.platform, "", "TITLE IDEAS", ...pack.titles.map((x,i) => (i+1)+". "+x), "", "HOOK IDEAS", ...pack.hooks.map((x,i)=>(i+1)+". "+x), "", "DESCRIPTION", pack.description, "", "HASHTAGS", pack.hashtags, "", "THUMBNAIL BRIEF", pack.thumbnailBrief, "", "VIDEO OUTLINE", pack.outline, "", "REPURPOSING PLAN", pack.shortIdeas, "", pack.ctas].join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a"); link.href = url; link.download = "creatorkit-" + slugTag(pack.topic || "draft") + "-idea-pack.txt"; link.click(); URL.revokeObjectURL(url);
    setNotice("Idea pack exported as a text file.");
  }
  function removeSaved(id: string) { setSaved(items => items.filter(item => item.id !== id)); setNotice("Saved pack removed."); }

  return <section className="pro-tools">
    <div className="tool-intro">
      <span className="tool-eyebrow"><WandSparkles size={15}/> CREATOR TOOLBOX</span>
      <h1>Make the next upload easier.</h1>
      <p>Turn your own topic into a practical, editable starting pack. No fake analytics, no automatic posting, and no account connection required.</p>
      <div className="tool-benefits"><span><Check size={15}/> Editable results</span><span><Check size={15}/> Saves on this device</span><span><Check size={15}/> Export anytime</span></div>
    </div>
    <div className="tool-workspace">
      <div className="tool-form">
        <div className="tool-form-heading"><div><small>STEP 1</small><h2>Tell us about your video</h2></div><span className="tool-step">About 30 seconds</span></div>
        <label>What's the topic? <span className="required-note">Required</span><input value={topic} onChange={e=>setTopic(e.target.value)} maxLength={160} placeholder="e.g. building a budget home server" /></label>
        <label>Who is it for? <input value={audience} onChange={e=>setAudience(e.target.value)} maxLength={160} placeholder="e.g. beginners who want to learn tech" /></label>
        <label>Keywords <span className="field-hint">Optional · separate with commas</span><input value={keywords} onChange={e=>setKeywords(e.target.value)} placeholder="homelab, budget PC, beginner tips" /></label>
        <div className="tool-two-col"><label>Content format<select value={platform} onChange={e=>setPlatform(e.target.value)}><option>YouTube video</option><option>YouTube Short</option><option>TikTok / Reel</option></select></label><label>Style<select value={tone} onChange={e=>setTone(e.target.value)}>{tones.map(item=><option key={item}>{item}</option>)}</select></label></div>
        <label>What's the goal? <select value={goal} onChange={e=>setGoal(e.target.value)}><option>Teach something useful</option><option>Tell a personal story</option><option>Review a product or tool</option><option>Entertain the audience</option><option>Help solve a problem</option><option>Share a project update</option></select></label>
        <button className="primary tool-generate" onClick={generate}><WandSparkles size={17}/> {draft ? "Regenerate idea pack" : "Build my idea pack"}</button>
        <p className="tool-helper">These are writing suggestions, not performance predictions. Choose what feels true to your video.</p>
      </div>
      <div className="tool-side-help"><div className="help-icon"><Lightbulb size={22}/></div><h3>Good videos start with clarity</h3><p>Pick one audience, one main promise, and one useful takeaway. You can change every suggestion after it generates.</p><div className="help-tip"><b>Quick tip</b><span>A specific title is usually more helpful than a vague promise. Avoid claims your video can't prove.</span></div><button className="secondary" onClick={()=>{setTopic("");setAudience("");setKeywords("");setNotice("Form cleared. Add a topic when you're ready.");}}>Clear form</button></div>
    </div>
    {notice && <p className="tool-notice" role="status">{notice}</p>}
    {draft && <div className="tool-results">
      <div className="tool-results-head"><div><small>STEP 2</small><h2>Your idea pack</h2><p>{draft.topic} · {draft.platform}</p></div><div className="tool-result-actions"><button className="secondary" onClick={savePack}><BookmarkPlus size={15}/> Save pack</button><button className="primary" onClick={()=>exportPack()}><Download size={15}/> Export pack</button></div></div>
      <article className="tool-output"><h3><Type size={17}/> Title studio <span>6 options</span></h3><p className="output-hint">Pick a title that accurately reflects what viewers will get.</p><ol className="title-options">{draft.titles.map((item,i)=><li key={i}><span>{item}</span><button className="tool-copy" onClick={()=>copy(item)} aria-label={"Copy title option "+(i+1)}><Copy size={14}/></button></li>)}</ol><button className="secondary" onClick={()=>copy(draft.titles.join("\n"))}><Copy size={15}/> Copy all titles</button></article>
      <article className="tool-output"><h3><WandSparkles size={17}/> Hook builder <span>4 options</span></h3><p className="output-hint">Use these as inspiration; say them in your own voice.</p><ol className="title-options">{draft.hooks.map((item,i)=><li key={i}><span>{item}</span><button className="tool-copy" onClick={()=>copy(item)} aria-label={"Copy hook option "+(i+1)}><Copy size={14}/></button></li>)}</ol><button className="secondary" onClick={()=>copy(draft.hooks.join("\n\n"))}><Copy size={15}/> Copy all hooks</button></article>
      <article className="tool-output"><h3><FileText size={17}/> Description builder</h3><textarea aria-label="Editable video description" value={draft.description} onChange={e=>setDraft({...draft,description:e.target.value})}/><button className="secondary" onClick={()=>copy(draft.description)}><Copy size={15}/> Copy description</button></article>
      <article className="tool-output"><h3><Tags size={17}/> Hashtag organizer</h3><textarea aria-label="Editable hashtags" value={draft.hashtags} onChange={e=>setDraft({...draft,hashtags:e.target.value})}/><button className="secondary" onClick={()=>copy(draft.hashtags)}><Copy size={15}/> Copy hashtags</button></article>
      <article className="tool-output"><h3><Image size={17}/> Thumbnail planner</h3><textarea aria-label="Editable thumbnail brief" value={draft.thumbnailBrief} onChange={e=>setDraft({...draft,thumbnailBrief:e.target.value})}/><button className="secondary" onClick={()=>copy(draft.thumbnailBrief)}><Copy size={15}/> Copy thumbnail brief</button></article>
      <article className="tool-output"><h3><FileText size={17}/> Video outline</h3><textarea aria-label="Editable video outline" value={draft.outline} onChange={e=>setDraft({...draft,outline:e.target.value})}/><button className="secondary" onClick={()=>copy(draft.outline)}><Copy size={15}/> Copy outline</button></article>
      <article className="tool-output"><h3><Scissors size={17}/> Shorts & repurposing planner</h3><textarea aria-label="Editable repurposing plan" value={draft.shortIdeas} onChange={e=>setDraft({...draft,shortIdeas:e.target.value})}/><button className="secondary" onClick={()=>copy(draft.shortIdeas)}><Copy size={15}/> Copy repurposing plan</button></article>
      <article className="tool-output"><h3><Lightbulb size={17}/> Call-to-action ideas</h3><textarea aria-label="Editable call to action ideas" value={draft.ctas} onChange={e=>setDraft({...draft,ctas:e.target.value})}/><button className="secondary" onClick={()=>copy(draft.ctas)}><Copy size={15}/> Copy CTA ideas</button></article>
    </div>}
    <section className="saved-packs"><div className="saved-packs-head"><div><h2>Saved idea packs</h2><p>Saved on this device only. Export a pack if you want a separate copy.</p></div><button className="secondary" onClick={()=>setShowSaved(v=>!v)}>{showSaved?"Hide saved packs":"View saved packs"} ({saved.length})</button></div>
      {showSaved && (saved.length ? <div className="saved-pack-list">{saved.map(item=><article key={item.id}><div><b>{item.topic}</b><small>{new Date(item.createdAt).toLocaleDateString()} · {item.platform}</small></div><div><button className="secondary" onClick={()=>{setDraft(item);setNotice("Saved pack opened. You can edit it and export again.");window.scrollTo({top:0,behavior:"smooth"});}}>Open</button><button className="secondary" onClick={()=>exportPack(item)} aria-label={"Export "+item.topic}><Download size={14}/></button><button className="tool-delete" onClick={()=>removeSaved(item.id)} aria-label={"Delete saved pack "+item.topic}><Trash2 size={15}/></button></div></article>)}</div> : <p className="saved-empty">No saved packs yet. Build a pack, then choose “Save pack”.</p>)}
    </section>
  </section>;
}
