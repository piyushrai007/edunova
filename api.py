from flask import Flask, request
from flask_restful import Resource, Api
from moviepy.editor import VideoFileClip
import speech_recognition as sr
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer
from gensim.summarization import summarize
from pytorch_transformers import GPT2Tokenizer, GPT2LMHeadModel

app = Flask(__name__)
api = Api(app)

class VideoSummary(Resource):
    def post(self):
        file = request.files['video']
        file.save("temp.mp4")

        # Extract audio from video
        clip = VideoFileClip("temp.mp4")
        clip.audio.write_audiofile("temp.wav")

        # Transcribe audio to text
        r = sr.Recognizer()
        with sr.AudioFile('temp.wav') as source:
            audio_text = r.listen(source)
            text = r.recognize_google(audio_text)

        # Summarize text
        parser = PlaintextParser.from_string(text, Tokenizer("english"))
        summarizer = LsaSummarizer()
        summary = summarizer(parser.document, 3)  # Summarize the document with 3 sentences

        # Generate MCQs
        tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
        model = GPT2LMHeadModel.from_pretrained('gpt2')
        mcqs = model.generate(tokenizer.encode(summary, return_tensors='pt'), max_length=100, temperature=0.7)

        return {'summary': summary, 'mcqs': mcqs}

api.add_resource(VideoSummary, '/')

if __name__ == '__main__':
    app.run(debug=True)