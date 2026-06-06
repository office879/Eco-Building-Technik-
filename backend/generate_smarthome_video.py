"""One-off Sora 2 video generation for ECO Building Technik Smart Home spotlight."""
import os
import sys
from pathlib import Path
from dotenv import load_dotenv

sys.path.insert(0, os.path.abspath(''))
load_dotenv(Path(__file__).parent / '.env')

from emergentintegrations.llm.openai.video_generation import OpenAIVideoGeneration

PROMPT = (
    "Cinematic 4K luxury commercial. A young beautiful European woman in her mid-twenties, "
    "with long brown hair, elegant minimal style, gently taps a futuristic wall-mounted smart home "
    "control panel with glowing turquoise interface in a modern Austrian penthouse apartment. "
    "Sleek dark navy walls, warm amber accent lighting, polished concrete floor, floor-to-ceiling "
    "windows revealing a city skyline at dusk. Close-up macro shots of premium smart thermostats, "
    "sleek heat pump units, LED ambient strips and a slim tablet on a marble counter showing energy "
    "dashboards with charts. Slow cinematic dolly camera, very shallow depth of field, soft bokeh, "
    "warm cinematic color grading with cyan and amber accents, premium architecture digest aesthetic. "
    "No on-screen text, no logos, no captions. Smooth subtle motion. Hyperrealistic, photorealistic, "
    "high production value commercial."
)

OUT = "/app/backend/static/smart-home-video.mp4"
os.makedirs(os.path.dirname(OUT), exist_ok=True)

print(f">>> Starting Sora 2 generation -> {OUT}")
print(f">>> Prompt: {PROMPT[:120]}...")

gen = OpenAIVideoGeneration(api_key=os.environ['EMERGENT_LLM_KEY'])
video_bytes = gen.text_to_video(
    prompt=PROMPT,
    model="sora-2",
    size="1280x720",
    duration=12,
    max_wait_time=900,
)
if video_bytes:
    gen.save_video(video_bytes, OUT)
    size_mb = os.path.getsize(OUT) / 1024 / 1024
    print(f"✅ Video saved: {OUT} ({size_mb:.1f} MB)")
else:
    print("❌ Generation failed")
    sys.exit(1)
