FROM ubuntu:18.04
RUN apt-get update
RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:deadsnakes/ppa
RUN apt-get update --fix-missing
RUN apt-get install -y python3.6
RUN apt install -y python3-pip
RUN pip3 install --upgrade pip
RUN pip3 install requests
RUN apt install -y tesseract-ocr
RUN apt install git
RUN add-apt-repository ppa:linuxuprising/java
RUN apt update
RUN apt install oracle-java13-installer
RUN apt-get install oracle-java13-set-default
RUN export JAVA_HOME=/usr/bin/java
RUN export PATH=$JAVA_HOME/bin:$PATH
ADD . /FinalIntegration
WORKDIR /FinalIntegration
CMD [ "python3", "main.py" ]