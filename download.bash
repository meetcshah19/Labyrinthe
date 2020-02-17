#!/bin/bash
for i in {1..500}
do
curl http://hereandabove.com//cgi-bin/maze?40+40+20+2+5+0+0+0+255+255+255 > $i
done 
