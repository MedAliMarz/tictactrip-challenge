from pprint import pprint as pp
data = """Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. 

Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. 
 Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.
 """

'''
Given an array of words and a width maxWidth, 
format the text such that each line has exactly maxWidth characters and is fully (left and right) justified.

You should pack your words in a greedy approach; 
that is, pack as many words as you can in each line. 
Pad extra spaces ' ' when necessary so that each line has exactly maxWidth characters.

Extra spaces between words should be distributed as evenly as possible. 
If the number of spaces on a line do not divide evenly between words, 
the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no extra space is inserted between words.
'''

def justify_line(line):

	if(len(line) == 80):
		return line

	words = line.split(' ')
	space_num = len(words) - 1

	padding = 80 - len(line)
	output=''

	space_indexes = []
	last_index = 0
	while line.find(' ',last_index+1) != -1:
		last_index = line.find(' ',last_index+1)
		space_indexes.append(last_index)


	line = list(line)

	if (padding > space_num):

		for index in space_indexes:
			line[index ] += ' '*(padding //space_num)

		padding = padding % space_num

	for i in range(padding):
		line[space_indexes[i * (1 if i%2 else -1)]]+=' '

	
	output = ''.join(line)
	

	return output


def justify_paragraph(data):
	'''
		This function remove trailing spaces then split the text 
		into 80 characters lines, it uses extra space as padding
	'''
	if(len(data)<=80):
		return data
	# clean the extra space between lines
	para_data =  ' '.join([line.strip() for line in data.splitlines()])
	# generate the 80 chars limited lines
	# i used a greedy approach, adding as much words as possible in single line
	# -> removing the last word only if it splits when justifying
	output=[]
	# TODO : check the exact position to split the lines
	while len(para_data) > 80:

		if ( para_data[80]!=' '):

			last_space_index = para_data.rindex(' ',0,81)
			#print(para_data[last_space_index:81])
			line = para_data[:last_space_index].strip()
			para_data = para_data[last_space_index+1:]

			
		else:
			line = para_data[:80].strip()
			para_data = para_data[81:]
		
		output.append(justify_line(line))

	# deal with last line
	output.append(para_data.strip())

	return '\n'.join(output)

def justify(data):
	'''
		This function split the text into paragraphs
		Justify each one seperatly and join the results

	'''
	parags = data.split('\n\n')

	output = []
	for para in parags:
		output.append(justify_paragraph(para) )
	return '\n'.join(output) 


if __name__ == '__main__':
	
	print(justify(data))