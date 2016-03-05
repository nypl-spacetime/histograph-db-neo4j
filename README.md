MATCH (b:_) WHERE b.id IN ['urn:hgid:building-inspector/polygon-84529']
// find corresponding equivalence classes (ECs)
OPTIONAL MATCH (b)<-[:`=`]-(bConcept:`=`)
// choose the right node (EC if there, otherwise only member)
WITH coalesce(bConcept, b) AS building

MATCH (building)<-[:`hg:liesIn`|`=`|`=i` * 1 .. 8]-(p:`st:Person`)

RETURN p
