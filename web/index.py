from flask import Flask, render_template

app = Flask(__name__, static_folder='public', template_folder='views')

@app.route("/")
def home():
    return render_template('home.html')
  
@app.route("/commands")
def commands():
    return render_template('commands.html')  
  
if __name__ == '__main__':
  app.run(debug=True)