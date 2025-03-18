import "@typespec/http";
import "@typespec/versioning";

using TypeSpec.Http;
using TypeSpec.Versioning;

@service(#{ title: "Golden Raspberry Awards" })
@doc("WebService REST para entrega do teste de back end da empresa Outsera.\n\nAutor: Dami Izolan")
@server("http://localhost:3000", "Local server")
@versioned(Versions)
namespace GRAService;

enum Versions {
	v1: "1.0",
}

@example(#{
	min: #[
		#{
			producer: "John Doe",
			interval: 1,
			previousWin: 1999,
			followingWin: 2000,
		}
	],
	max: #[
		#{
			producer: "Jane Doe",
			interval: 15,
			previousWin: 2001,
			followingWin: 2016,
		}
	],
})
model AwardsInterval {
	min: Result[];
	max: Result[];
}

model Result {
	producer: string;
	interval: int32;
	previousWin: int32;
	followingWin: int32;
}

@error
@example(#{ error: "Internal server error" })
model Error {
	error: string;
}

@route("/api/v1/awards-interval")
@tag("Intervalos")
interface Awards {
	/** Retorna os produtores com o maior intervalo entre dois prêmios consecutivos e com o menor intervalo. */
	@summary("Maiores e menores intervalos entre dois prêmios")
	@get
	maxMin(): {
		@statusCode statusCode: 200;
		@body interval: AwardsInterval;
	} | {
		@statusCode statusCode: 500;
		@body error: Error;
	};
}
