#script for installing background OCR functionality in EisenVault
#Author: Vipul Swarup
#Date: 19 June 2015
#NOTE: This script must be run as sudo or su
#NOTE: This script uses the apt-get package manager, which is standard on ubuntu
#NOTE: This script assumes Alfresco Root is /opt/alfresco

#step 1 - copy convert2pdf.sh to /opt/ocr and make it executable
mkdir /opt/ocr
cp convert2pdf.sh /opt/ocr
chmod a+x /opt/ocr/convert2pdf.sh

#step 2 - download and install tesseract
apt-get update
apt-get install tesseract-ocr

#step3 copy and apply AMP file with Alfresco code changes
cp repo-amp.amp /opt/alfresco/amps

#step4 make a temp directory
mkdir /tmp/Alfresco
