function mainController($scope) {
	console.log("Load ok");  

	$scope.atk = 0;
	$scope.def = 0;
	$scope.hp = 0;
	$scope.crt = 0;
	$scope.cdmg = 0;
	$scope.eff = 0;
	$scope.res = 0;
	$scope.artg = 1;
	$scope.artlvl = 1;
  	$scope.has_passive = false;
	$scope.passive_sk_up = 0;
	$scope.has_exc_equip = false;
	$scope.skill_ups = [];
	$scope.show_result = false;
	
	$scope.skill_up_list = [
		["+5% chance of inflicting bleeding", 0.004],	
		["+10% effect chance", 0.008],
		//["+10% effect chance", 0.01],	
		//["+5% effect chance", 0.006],
		["+10% provoke chance", 0.008],	
		["+10% effect chance", 0.012],
		["+15% provoke chance", 0.012],
		["+15% effect chance", 0.013],
		["+10% debuff chance", 0.01],	
		["+2% effect chance", 0.005],
		["+15% debuff chance", 0.012],
		["+25% effect chance", 0.013],
		["+10% dispel chance", 0.01],
		["+3% effect chance", 0.006],
		["+5% dispel chance", 0.006],
		["+5% effect chance", 0.008],
		["+1% Combat Readiness", 0.004],
		["+2% healing / Combat Readiness", 0.007],
		["+10% Combat Readiness", 0.015],
		["+3% healing / Combat Readiness", 0.009],
		["+2% Combat Readiness", 0.005],
		["+3% Combat Readiness", 0.006],
		["+3% Combat Readiness", 0.006],
		["+4% Combat Readiness", 0.007],
		["+5% Combat Readiness", 0.008],
		["+5% healing / Combat Readiness", 0.011],
		["-10 Fighting Spirit consumed", 0.008],
		["+10% healing", 0.012],
		["+5 Fighting Spirit acquired", 0.005],
		["+15% healing", 0.014],
		["-1 turn cooldown", 0.02],	
		["+20% healing", 0.015],
		["+10% damage dealt", 0.014],
		["+5% healing", 0.008],
		["+15% damage dealt", 0.015],
		["+1 Soul acquired", 0.006],
		["+5% damage dealt", 0.012],
		["+10% Combat Readiness", 0.013],
		["+2 Soul acquired", 0.01],
		["+10% barrier strength", 0.012],
		["+5% Combat Readiness", 0.01],	
		["+5% barrier strength", 0.01],
		["+15% barrier strength", 0.013]
	
	];
	$scope.skill_up_list.sort();

	var art3 = [0.03, 0.033, 0.036, 0.039, 0.042, 0.045, 0.048, 0.051, 0.054, 0.057, 0.06];
	var art4 = [0.045, 0.049, 0.053, 0.058, 0.062, 0.067, 0.072, 0.0765, 0.081, 0.0855, 0.09];
	var art5 = [0.06, 0.066, 0.072, 0.078, 0.084, 0.090, 0.096, 0.102, 0.108, 0.114, 0.12];
	var passive = [0.008, 0.017, 0.027, 0.038, 0.05, 0.063, 0.077, 0.092, 0.108];

	$scope.add_skill_up = function(sk){
		$scope.skill_ups.push([sk[0], sk[1]]);
	}
	
	$scope.remove_skill_up = function(idx){

		var sk = $scope.skill_ups[idx];
		$scope.skill_ups.splice(idx, 1);	
	}

	$scope.calc = function() {
				
		var ART_multi = 0;
		var SK_multi = 0;
		var EXC_equip = 0;

		if($scope.has_exc_equip){
			EXC_equip = 0.02;
		}

		if ($scope.skill_ups.length > 0) {
			$scope.skill_ups.forEach(function(sk) {
				SK_multi = SK_multi + sk[1];
			});
		}

		console.log("SK Multi", SK_multi);
		console.log("ARTG", $scope.artg);
		if($scope.artg != 0){
			if ($scope.artg == 3){
				ART_multi = art3[$scope.artlvl - 1];	
			}
			else if ($scope.artg == 4){
				ART_multi = art4[$scope.artlvl - 1];
			}
			else if ($scope.artg == 5){
				ART_multi = art5[$scope.artlvl - 1];
			}
		}
		
		if ($scope.has_pasive) {
			SK_multi = SK_multi + passive[$scope.passive_sk_up];
		}
		
		console.log($scope.atk, $scope.def, $scope.hp, $scope.spd, $scope.crt, $scope.cdmg, $scope.eff, $scope.res, ART_multi, SK_multi, EXC_equip);

		result = (($scope.atk * 1.6 + $scope.atk * 1.6 * $scope.crt * $scope.cdmg) * (1 + ($scope.spd - 45) * 0.02) + $scope.hp + $scope.def * 9.3) * (1 + ($scope.res + $scope.eff) / 4) 
		result = result *  (1 + ART_multi + SK_multi + EXC_equip)
		console.log("Result: ", result);
		
		$scope.show_result = true;
		$scope.result = Math.floor(result);
	}

}
