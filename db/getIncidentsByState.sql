select inc.id, state, inj.name injury, aa.name affectedArea, c.name cause 
from incidents inc
join injuries inj on inc.injuryid = inj.id
join affectedareas aa on aa.id = inj.affectedareaid
join causes c on c.id = inc.causeid
where state = $1