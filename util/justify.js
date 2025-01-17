const justify_line = (line) => {

    if(line.length === 80){
        return line;
    }
	
    const words = line.split(' ');
    const space_num = words.length - 1;
    let padding = 80 - line.length;
    let output;
    // find the space indexes

    const space_indexes = []
    let last_index  = 0;
    while( line.indexOf(' ',last_index+1) >=0 ){
        last_index = line.indexOf(' ',last_index+1);
		space_indexes.push(last_index);
    }
    line = Array.from(line);

    if (padding >= space_num){
		const multi = Math.floor(padding /space_num);
		const spaces = ' '.repeat(multi);
        for(let index of space_indexes){
            line[index] += spaces
        }
        padding = padding % space_num;
        
    }
    for(var i=0;i<padding;i++){
		if(i%2===0){
			line[space_indexes[i]] += ' ';
		}else{
			line[space_indexes[padding-i]] += ' ';

		}
	}
    output = line.join('');
	return output;
}

const justify_paragraph = (data)=>{
	if(data.length <= 0){
		return data;
	}
	// clean trailing lines from paragraphs
	let paragraphData = data.split('\n').map(line => line.trim()).join(' ');
	// extract the 80 chars limited lines
	const output = [];
	let line, lastSpaceIndex;
	while(paragraphData.length >80){
		if(paragraphData[80]!== ' '){
			lastSpaceIndex = paragraphData.lastIndexOf(' ',80);
			line = paragraphData.substring(0,lastSpaceIndex);
			paragraphData = paragraphData.substring(lastSpaceIndex + 1);
		}else{
			line = paragraphData.substring(0,80);
			paragraphData = paragraphData.substring(81);
		}
		output.push(justify_line(line.trim()));
	};
	// deal with last line
	output.push(paragraphData.trim());

	return output.join('\n');
}

const justify = (data) => {

	const paragraphs = data.split('\n\n');
	const output = [];
	for(let paragraph of paragraphs){
		output.push(justify_paragraph(paragraph));
	}
	return output.join('\n');

}
/* testing */ 

//const data = "Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. \n\nCette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. \n Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.\n ";
//console.log(justify(data));


module.exports = justify;